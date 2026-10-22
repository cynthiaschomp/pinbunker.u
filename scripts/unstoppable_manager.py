#!/usr/bin/env python3
"""
scripts/unstoppable_manager.py
Autonomous Unstoppable Domains management utility for PinBunker.
Uses the Unstoppable Domains MCP streamable HTTP endpoint or partner API to:
- Inspect domain status and DNS records for pinbunker.u / pinbunker.com
- Update IPFS website CID / IPNS records automatically upon new releases
- Manage cart, quotes, and domain assets
"""

import os
import sys
import json
import logging
import urllib.request
from typing import Dict, Any, Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] [UD-Manager] %(message)s")
logger = logging.getLogger("ud_manager")

UD_API_KEY = os.getenv("UNSTOPPABLE_API_KEY", "ud_mcp_9b6029249f1d63a40d3d89b7c3545eedeae13fa77f30d0ffb5b78af4c9306961")
MCP_URL = "https://api.unstoppabledomains.com/mcp/v1"

class UnstoppableManager:
    def __init__(self, api_key: str = UD_API_KEY):
        self.api_key = api_key

    def call_mcp_tool(self, tool_name: str, arguments: Dict[str, Any] = None) -> Optional[Dict[str, Any]]:
        """Invokes a tool on the Unstoppable Domains MCP server via JSON-RPC over Streamable HTTP."""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream"
        }
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {
                "name": tool_name,
                "arguments": arguments or {}
            }
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(MCP_URL, data=data, headers=headers)

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                raw = resp.read().decode("utf-8")
                for line in raw.split("\n"):
                    if line.startswith("data: "):
                        res_json = json.loads(line[6:])
                        content = res_json.get("result", {}).get("content", [])
                        if content and content[0].get("type") == "text":
                            try:
                                return json.loads(content[0]["text"])
                            except Exception:
                                return {"raw_text": content[0]["text"]}
                        return res_json.get("result")
        except Exception as e:
            logger.error(f"Error calling Unstoppable MCP tool '{tool_name}': {e}")
            return None

    def search_domain(self, domain_name: str) -> Optional[Dict[str, Any]]:
        logger.info(f"Checking status for domain: {domain_name}")
        return self.call_mcp_tool("ud_domains_search", {"query": [domain_name]})

    def list_portfolio(self) -> Optional[Dict[str, Any]]:
        logger.info("Fetching portfolio domains...")
        return self.call_mcp_tool("ud_portfolio_list", {})

    def get_dns_records(self, domain_name: str) -> Optional[Dict[str, Any]]:
        logger.info(f"Listing DNS records for: {domain_name}")
        return self.call_mcp_tool("ud_dns_records_list", {"domain": domain_name})

    def update_ipfs_website(self, domain: str, ipfs_cid: str):
        """
        Links an IPFS website CID to the domain records.
        """
        logger.info(f"Configuring IPFS Website CID {ipfs_cid} for {domain}...")
        # Add DNS hosting or TXT/CNAME records
        res = self.call_mcp_tool("ud_dns_hosting_add", {
            "domain": domain,
            "service": "ipfs",
            "target": ipfs_cid
        })
        logger.info(f"Result: {res}")
        return res

if __name__ == "__main__":
    manager = UnstoppableManager()
    if len(sys.argv) > 1 and sys.argv[1] == "search":
        dom = sys.argv[2] if len(sys.argv) > 2 else "pinbunker.com"
        print(json.dumps(manager.search_domain(dom), indent=2))
    elif len(sys.argv) > 1 and sys.argv[1] == "portfolio":
        print(json.dumps(manager.list_portfolio(), indent=2))
    else:
        print("Unstoppable Domains Manager for PinBunker")
        print("Usage: python3 scripts/unstoppable_manager.py [search <domain> | portfolio]")
        # Quick check
        res = manager.search_domain("pinbunker.com")
        if res and "results" in res:
            first = res["results"][0]
            print(f"Domain: {first['name']} | Status: {first['status']} | Price: {first['pricing']['formatted']}")
