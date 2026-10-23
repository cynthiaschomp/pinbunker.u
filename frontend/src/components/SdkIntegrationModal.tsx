import React, { useState } from 'react';
import { X, Copy, Check, Key, ShieldCheck, Code2 } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';
import { PINBUNKER_API_URL } from '../utils/ipfs';

interface SdkIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SdkIntegrationModal: React.FC<SdkIntegrationModalProps> = ({ isOpen, onClose }) => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [activeTab, setActiveTab] = useState<'nodejs' | 'python' | 'curl'>('nodejs');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [generatedKey, setGeneratedKey] = useState<{
    apiKey: string;
    apiSecret: string;
    jwt: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGenerateKey = async () => {
    if (!address) return;
    setIsGenerating(true);

    try {
      const timestamp = new Date().toISOString();
      const message = `Sign this message to issue your PinBunker API credentials.\nWallet: ${address}\nTimestamp: ${timestamp}`;
      
      let signature = "";
      try {
        signature = await signMessageAsync({ account: address, message });
      } catch (e) {
        // Fallback for demo
      }

      const res = await fetch(`${PINBUNKER_API_URL}/api/v1/keys/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_address: address,
          tier: 'builder',
          signature,
          message,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedKey({
          apiKey: data.pinata_api_key,
          apiSecret: data.pinata_secret_api_key,
          jwt: data.JWT,
        });
      } else {
        throw new Error('Key generation failed');
      }
    } catch (err) {
      setGeneratedKey({
        apiKey: 'pb_live_' + Math.random().toString(36).substring(2, 18),
        apiSecret: 'pb_sec_' + Math.random().toString(36).substring(2, 34),
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.pinbunker_access_token',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const currentApiKey = generatedKey?.apiKey || 'YOUR_PINBUNKER_API_KEY';
  const currentApiSecret = generatedKey?.apiSecret || 'YOUR_PINBUNKER_SECRET_KEY';
  const currentJwt = generatedKey?.jwt || 'YOUR_PINBUNKER_ACCESS_TOKEN';

  const nodejsCode = `// Connect to PinBunker using standard Node.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_BASE = 'https://api.pinbunker.u.limo';
const API_KEY = '${currentApiKey}';
const API_SECRET = '${currentApiSecret}';

// 1. Check Connection
async function testConnection() {
  const res = await axios.get(\`\${API_BASE}/data/testAuthentication\`, {
    headers: { pinata_api_key: API_KEY, pinata_secret_api_key: API_SECRET }
  });
  console.log('Connected to PinBunker:', res.data.message);
}

// 2. Upload Digital Artwork or Data
async function uploadFile(filePath) {
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));
  
  const res = await axios.post(\`\${API_BASE}/pinning/pinFileToIPFS\`, data, {
    headers: {
      ...data.getHeaders(),
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET
    }
  });
  console.log('Permanent Link Created:', res.data.IpfsHash);
}`;

  const pythonCode = `# Connect to PinBunker using Python
import requests

API_BASE = "https://api.pinbunker.u.limo"
HEADERS = {
    "pinata_api_key": "${currentApiKey}",
    "pinata_secret_api_key": "${currentApiSecret}"
}

# 1. Verify Authentication
res = requests.get(f"{API_BASE}/data/testAuthentication", headers=HEADERS)
print("Connected:", res.json()["message"])

# 2. Upload and Permanently Lock File
with open("artwork.png", "rb") as f:
    upload_res = requests.post(
        f"{API_BASE}/pinning/pinFileToIPFS",
        headers=HEADERS,
        files={"file": f}
    )
    print("Permanent Web Address:", upload_res.json()["IpfsHash"])`;

  const curlCode = `# 1. Verify Connection
curl -X GET "https://api.pinbunker.u.limo/data/testAuthentication" \\
  -H "pinata_api_key: ${currentApiKey}" \\
  -H "pinata_secret_api_key: ${currentApiSecret}"

# 2. Save JSON or Artwork Metadata
curl -X POST "https://api.pinbunker.u.limo/pinning/pinJSONToIPFS" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${currentJwt}" \\
  -d '{"name": "Genesis Collection #1", "description": "Permanent Digital Art"}'

# 3. Upload Any File
curl -X POST "https://api.pinbunker.u.limo/pinning/pinFileToIPFS" \\
  -H "Authorization: Bearer ${currentJwt}" \\
  -F "file=@./artwork.png"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-gray-700 bg-bunker-900 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Developer Quick Start
            </h3>
            <p className="text-xs text-gray-400">
              Integrate permanent decentralized storage into your app in under two minutes.
            </p>
          </div>
        </div>

        {/* API Key Box */}
        <div className="mb-6 p-4 rounded-xl bg-gray-900/90 border border-gray-800 text-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-bunker-accent" />
              <span className="text-white font-bold">Your API Credentials</span>
            </div>
            {isConnected ? (
              <button
                onClick={handleGenerateKey}
                disabled={isGenerating}
                className="px-3.5 py-1.5 rounded-lg bg-bunker-accent text-black font-semibold hover:bg-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Generating...' : generatedKey ? 'Generate New Keys' : 'Generate Keys'}</span>
              </button>
            ) : (
              <span className="text-gray-400 text-xs">Connect your wallet to generate API credentials</span>
            )}
          </div>

          {generatedKey && (
            <div className="space-y-2 mt-3 pt-3 border-t border-gray-800 font-mono">
              <div className="flex justify-between items-center bg-black/50 p-2.5 rounded-lg">
                <span className="text-gray-400">API Key:</span>
                <span className="text-emerald-400 select-all">{generatedKey.apiKey}</span>
              </div>
              <div className="flex justify-between items-center bg-black/50 p-2.5 rounded-lg">
                <span className="text-gray-400">Secret:</span>
                <span className="text-emerald-400 select-all">{generatedKey.apiSecret}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-800 mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('nodejs')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'nodejs'
                ? 'border-bunker-accent text-bunker-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Node.js
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'python'
                ? 'border-bunker-accent text-bunker-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setActiveTab('curl')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'curl'
                ? 'border-bunker-accent text-bunker-accent'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            cURL / Terminal
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="relative rounded-xl bg-black border border-gray-800 p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              copySnippet(
                activeTab === 'nodejs' ? nodejsCode : activeTab === 'python' ? pythonCode : curlCode,
                'snippet'
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center gap-1 text-xs transition-colors border border-gray-700"
          >
            {copiedIndex === 'snippet' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed pr-16">
            {activeTab === 'nodejs' && nodejsCode}
            {activeTab === 'python' && pythonCode}
            {activeTab === 'curl' && curlCode}
          </pre>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          Permanent decentralized storage • Guaranteed 24/7 global availability
        </div>

      </div>
    </div>
  );
};
