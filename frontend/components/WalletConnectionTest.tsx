import React from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  Wallet,
  Globe,
  Settings,
  Info
} from "lucide-react";

const WalletConnectionTest: React.FC = () => {
  const { account, connected, connect, disconnect, wallet, network } = useWallet();

  const getNetworkStatus = () => {
    if (network?.name?.toLowerCase() === 'devnet') {
      return { status: 'correct', color: 'green', icon: CheckCircle };
    } else if (network?.name) {
      return { status: 'wrong', color: 'yellow', icon: AlertTriangle };
    } else {
      return { status: 'unknown', color: 'gray', icon: Info };
    }
  };

  const networkStatus = getNetworkStatus();
  const NetworkIcon = networkStatus.icon;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Wallet Connection Test
          </CardTitle>
          <CardDescription>
            Test and verify your wallet connection for the NFT Product Registry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Connection Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              {connected ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Connected</p>
                    <p className="text-sm text-green-600">Wallet is connected</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Not Connected</p>
                    <p className="text-sm text-yellow-600">Click connect button</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <NetworkIcon className={`w-6 h-6 text-${networkStatus.color}-600`} />
              <div>
                <p className={`font-medium text-${networkStatus.color}-800`}>
                  Network: {network?.name || 'Unknown'}
                </p>
                <p className={`text-sm text-${networkStatus.color}-600`}>
                  {networkStatus.status === 'correct' ? 'Correct (Devnet)' : 
                   networkStatus.status === 'wrong' ? 'Wrong network!' : 'Check network'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">
                  Wallet: {wallet?.name || 'None'}
                </p>
                <p className="text-sm text-blue-600">
                  {wallet ? 'Wallet detected' : 'No wallet selected'}
                </p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          {connected && account && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Account Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Address:</span>
                  <code className="ml-2 px-2 py-1 bg-green-100 rounded text-green-800">
                    {account.address.toString()}
                  </code>
                </div>
                {account.ansName && (
                  <div>
                    <span className="font-medium">ANS Name:</span>
                    <span className="ml-2 text-green-700">{account.ansName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Network Warning */}
          {connected && networkStatus.status === 'wrong' && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Wrong Network Detected</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your wallet is connected to <strong>{network?.name}</strong> but the app requires <strong>Devnet</strong>.
                  </p>
                  <p className="text-sm text-yellow-700 mt-2">
                    Please switch your Petra wallet to <strong>Devnet</strong> in the wallet settings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-3">Setup Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
              <li>Install <strong>Petra Wallet</strong> browser extension if not already installed</li>
              <li>Open Petra Wallet and switch to <strong>Devnet</strong> network</li>
              <li>Click <strong>"Connect a Wallet"</strong> button in the header</li>
              <li>Select <strong>Petra</strong> from the wallet list</li>
              <li>Approve the connection in the Petra popup</li>
              <li>Verify you see green status indicators above</li>
            </ol>
          </div>

          {/* Contract Info */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">Contract Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Contract Address:</span>
                <code className="block mt-1 p-2 bg-gray-100 rounded text-xs break-all">
                  0x01f1c5a069694aa1bbcec54f09007417cf45dfe4303d37a402c9be2fc741aaca
                </code>
              </div>
              <div>
                <span className="font-medium">Network:</span>
                <Badge className="ml-2 bg-blue-100 text-blue-800">Aptos Devnet</Badge>
              </div>
            </div>
          </div>

          {/* Test Actions */}
          <div className="flex flex-wrap gap-3">
            {!connected ? (
              <Button onClick={() => connect} className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>Test Connection</span>
              </Button>
            ) : (
              <Button onClick={disconnect} variant="outline" className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>Disconnect</span>
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => window.open('https://explorer.aptoslabs.com/account/0x01f1c5a069694aa1bbcec54f09007417cf45dfe4303d37a402c9be2fc741aaca?network=devnet', '_blank')}
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>View Contract</span>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConnectionTest;
