import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  QrCode, 
  Shield, 
  Zap, 
  Users, 
  Globe,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

const DemoPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🏷️ OWNIFY Demo
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          NFT-based Proof of Product Ownership on Aptos Blockchain
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Frontend Ready
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Package className="w-3 h-3 mr-1" />
            Smart Contract Compiled
          </Badge>
          <Badge className="bg-purple-100 text-purple-800">
            <QrCode className="w-3 h-3 mr-1" />
            QR Codes Working
          </Badge>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Product Minting
            </CardTitle>
            <CardDescription>
              Create unique NFTs for physical products with metadata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Product ID & Batch tracking</li>
              <li>✅ Manufacturer verification</li>
              <li>✅ Automatic QR generation</li>
              <li>✅ On-chain metadata storage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="w-5 h-5 mr-2 text-green-600" />
              QR Code System
            </CardTitle>
            <CardDescription>
              Generate and scan QR codes for instant verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Automatic QR generation</li>
              <li>✅ Camera-based scanning</li>
              <li>✅ Instant authenticity check</li>
              <li>✅ Mobile-friendly interface</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-600" />
              Ownership Transfer
            </CardTitle>
            <CardDescription>
              Seamless ownership transfer through NFT transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Secure wallet-to-wallet transfer</li>
              <li>✅ Automatic ownership update</li>
              <li>✅ Transaction history tracking</li>
              <li>✅ Warranty rights transfer</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Product Activation
            </CardTitle>
            <CardDescription>
              Activate products to unlock full ownership features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ One-click activation</li>
              <li>✅ Timestamp recording</li>
              <li>✅ Status management</li>
              <li>✅ Warranty activation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              Multi-User Support
            </CardTitle>
            <CardDescription>
              Support for manufacturers, retailers, and consumers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Manufacturer dashboard</li>
              <li>✅ Consumer interface</li>
              <li>✅ Retailer integration</li>
              <li>✅ Service provider access</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-cyan-600" />
              Blockchain Features
            </CardTitle>
            <CardDescription>
              Leveraging Aptos blockchain for security and transparency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Immutable records</li>
              <li>✅ Transparent history</li>
              <li>✅ Low transaction costs</li>
              <li>✅ Fast confirmations</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ready to Use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Frontend application</li>
              <li>• UI/UX interface</li>
              <li>• QR code generation</li>
              <li>• Wallet integration</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Deployment Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Smart contract deployment</li>
              <li>• Environment configuration</li>
              <li>• Network setup</li>
              <li>• Contract address update</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Info className="w-5 h-5 mr-2" />
              Demo Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Mock data simulation</li>
              <li>• UI testing mode</li>
              <li>• QR code testing</li>
              <li>• Feature demonstration</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Package className="w-4 h-4 mr-2" />
            Try Ownership Tracker
          </Button>
          <Button size="lg" variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            Generate QR Code
          </Button>
          <Button size="lg" variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </div>

      {/* Technical Info */}
      <div className="mt-16 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Smart Contract:</strong> Ownership Tracker on Aptos<br/>
            <strong>Frontend:</strong> React + Vite + TypeScript<br/>
            <strong>Styling:</strong> Tailwind CSS + Radix UI<br/>
            <strong>Wallet:</strong> Petra Wallet Integration
          </div>
          <div>
            <strong>QR Codes:</strong> qrcode + html5-qrcode<br/>
            <strong>Blockchain:</strong> Aptos Move Language<br/>
            <strong>Network:</strong> Devnet (configurable)<br/>
            <strong>Status:</strong> Development Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
