import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  const { connect, wallets } = useWallet();

  const handleConnect = () => {
    if (wallets && wallets.length > 0) {
      connect(wallets[0].name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <img 
          src="/logo.jpg.jpg" 
          alt="OWNIFY Logo" 
          className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-gray-200"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          OWNIFY
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          NFT Ownership Tracker
        </p>
        <Button 
          onClick={handleConnect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg"
        >
          Connect Wallet to Continue
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-8">
        Securely manage and verify your product ownership on the Aptos blockchain.
      </p>
    </div>
  );
};

export default LandingPage;