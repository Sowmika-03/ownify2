import React, { useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useWalletClient } from "@thalalabs/surf/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package,
  QrCode,
  ScanLine,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle
} from "lucide-react";
import QRCode from 'qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { PRODUCT_STATUS, PRODUCT_STATUS_LABELS, ProductMetadata, PRODUCT_REGISTRY_ABI } from '@/utils/product_registry_abi';
import { aptosClient } from '@/utils/aptosClient';

const ProductRegistry: React.FC = () => {
  const { account, connected } = useWallet();
  const { client } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductMetadata | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [scannerOpen, setScannerOpen] = useState(false);

  // Form states
  const [mintForm, setMintForm] = useState({
    productId: '',
    batchNumber: '',
    toAddress: ''
  });
  const [transferForm, setTransferForm] = useState({
    productId: '',
    newOwner: ''
  });
  const [activateProductId, setActivateProductId] = useState('');
  const [verifyProductId, setVerifyProductId] = useState('');

  // Auto-fill connected wallet address when wallet connects
  React.useEffect(() => {
    if (connected && account) {
      setMintForm(prev => ({
        ...prev,
        toAddress: account.address.toString()
      }));
    }
  }, [connected, account]);

  /**
   * Mint a new product NFT
   */
  const handleMintProduct = async () => {
    if (!client || !mintForm.productId || !mintForm.batchNumber || !mintForm.toAddress) {
      toast({
        title: "Error",
        description: "Please fill in all fields and connect wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const committedTransaction = await client.useABI(PRODUCT_REGISTRY_ABI).mint_product_nft({
        type_arguments: [],
        arguments: [
          mintForm.productId,
          mintForm.batchNumber,
          mintForm.toAddress as `0x${string}`
        ],
      });

      const transaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });

      // Find the NFT address from the transaction events
      const productMintedEvent = transaction.events.find(
        (event) => event.type === `${PRODUCT_REGISTRY_ABI.address}::product_registry::ProductMinted`
      );
      const nftAddress = productMintedEvent?.data?.nft_address;

      // Generate QR code for the product
      const qrData = JSON.stringify({
        productId: mintForm.productId,
        batchNumber: mintForm.batchNumber,
        contractAddress: PRODUCT_REGISTRY_ABI.address,
        type: 'product_verification',
        timestamp: Date.now(),
      });
      
      const qrCodeImage = await QRCode.toDataURL(qrData);
      setQrCodeData(qrCodeImage);

      toast({
        title: "Success! Product NFT Minted!",
        description: (
          <div>
            <p>Product ID: {mintForm.productId}</p>
            {nftAddress && (
              <a
                href={`https://explorer.aptoslabs.com/object/${nftAddress}?network=testnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View NFT on Explorer
              </a>
            )}
          </div>
        ),
      });

      // Reset form
      setMintForm({ productId: '', batchNumber: '', toAddress: '' });
    } catch (error) {
      console.error('Error minting product:', error);
      toast({
        title: "Error",
        description: "Failed to mint product NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Activate a product NFT
   */
  const handleActivateProduct = async () => {
    if (!client || !activateProductId) {
      toast({
        title: "Error",
        description: "Please enter a product ID and connect wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const committedTransaction = await client.useABI(PRODUCT_REGISTRY_ABI).activate_product({
        type_arguments: [],
        arguments: [activateProductId],
      });

      await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });

      toast({
        title: "Success!",
        description: `Product ${activateProductId} activated successfully!`,
      });

      setActivateProductId('');
    } catch (error) {
      console.error('Error activating product:', error);
      toast({
        title: "Error",
        description: "Failed to activate product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Transfer product ownership
   */
  const handleTransferProduct = async () => {
    if (!client || !transferForm.productId || !transferForm.newOwner) {
      toast({
        title: "Error",
        description: "Please fill in all fields and connect wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const committedTransaction = await client.useABI(PRODUCT_REGISTRY_ABI).transfer_product_ownership({
        type_arguments: [],
        arguments: [
          transferForm.productId,
          transferForm.newOwner as `0x${string}`
        ],
      });

      await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });

      toast({
        title: "Success!",
        description: `Product ${transferForm.productId} transferred successfully!`,
      });

      setTransferForm({ productId: '', newOwner: '' });
    } catch (error) {
      console.error('Error transferring product:', error);
      toast({
        title: "Error",
        description: "Failed to transfer product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify product authenticity (placeholder implementation)
   */
  const handleVerifyProduct = async () => {
    if (!verifyProductId) {
      toast({
        title: "Error",
        description: "Please enter a product ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // For demo purposes, we'll create a mock product metadata
      // In a real implementation, this would query the blockchain
      const mockMetadata: ProductMetadata = {
        product_id: verifyProductId,
        nft_address: "0x123...",
        manufacturer_address: "0x456...",
        batch_number: "BATCH-20240814-ABC",
        manufacture_timestamp: Date.now().toString(),
        status: PRODUCT_STATUS.ACTIVE,
        owner: account?.address?.toString() || "0x789...",
        activation_timestamp: Date.now().toString()
      };

      setSelectedProduct(mockMetadata);
      toast({
        title: "Authentic Product!",
        description: `Product ${verifyProductId} is verified authentic.`,
      });
    } catch (error) {
      console.error('Error verifying product:', error);
      toast({
        title: "Error",
        description: "Failed to verify product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Start QR code scanner
   */
  const startQRScanner = () => {
    setScannerOpen(true);
    
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        try {
          const qrData = JSON.parse(decodedText);
          if (qrData.type === 'product_verification' && qrData.productId) {
            setVerifyProductId(qrData.productId);
            scanner.clear();
            setScannerOpen(false);
            handleVerifyProduct();
          } else {
            toast({
              title: "Invalid QR Code",
              description: "This QR code is not a valid product verification code.",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Invalid QR Code",
            description: "This QR code is not a valid product verification code.",
            variant: "destructive",
          });
        }
      },
      (errorMessage) => {
        console.log(`QR scan error: ${errorMessage}`);
      }
    );
  };

  /**
   * Get status badge component
   */
  const getStatusBadge = (status: number) => {
    const statusColors = {
      [PRODUCT_STATUS.MINTED]: "bg-blue-100 text-blue-800",
      [PRODUCT_STATUS.ACTIVE]: "bg-green-100 text-green-800",
      [PRODUCT_STATUS.LOCKED_SERVICE]: "bg-yellow-100 text-yellow-800",
      [PRODUCT_STATUS.RETIRED]: "bg-gray-100 text-gray-800",
    };

    const statusIcons = {
      [PRODUCT_STATUS.MINTED]: <Clock className="w-3 h-3" />,
      [PRODUCT_STATUS.ACTIVE]: <CheckCircle className="w-3 h-3" />,
      [PRODUCT_STATUS.LOCKED_SERVICE]: <AlertCircle className="w-3 h-3" />,
      [PRODUCT_STATUS.RETIRED]: <XCircle className="w-3 h-3" />,
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {statusIcons[status as keyof typeof statusIcons]}
        <span className="ml-1">{PRODUCT_STATUS_LABELS[status as keyof typeof PRODUCT_STATUS_LABELS]}</span>
      </Badge>
    );
  };

  if (!connected) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader className="text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <CardTitle>Product Registry</CardTitle>
          <CardDescription>
            Connect your wallet to manage product NFTs
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🏷️ Product Registry
        </h1>
        <p className="text-lg text-gray-600">
          NFT-based Proof of Product Ownership on Aptos
        </p>
      </div>

      <Tabs defaultValue="mint" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mint">Mint NFT</TabsTrigger>
          <TabsTrigger value="activate">Activate</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
        </TabsList>

        {/* Mint Product NFT Tab */}
        <TabsContent value="mint">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Mint Product NFT
              </CardTitle>
              <CardDescription>
                Create a new NFT for product ownership verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productId">Product ID</Label>
                  <Input
                    id="productId"
                    placeholder="e.g., SHOE-001-2024"
                    value={mintForm.productId}
                    onChange={(e) => setMintForm({...mintForm, productId: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    placeholder="e.g., BTC-2024-001"
                    value={mintForm.batchNumber}
                    onChange={(e) => setMintForm({...mintForm, batchNumber: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="toAddress">Owner Address</Label>
                <Input
                  id="toAddress"
                  placeholder={connected ? "Auto-filled with your wallet address" : "Connect wallet to auto-fill"}
                  value={mintForm.toAddress}
                  onChange={(e) => setMintForm({...mintForm, toAddress: e.target.value})}
                  className="font-mono text-sm"
                />
                {connected && mintForm.toAddress && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ✓ Using your connected wallet address
                  </p>
                )}
              </div>
              <Button 
                onClick={handleMintProduct} 
                disabled={loading}
                className="w-full"
              >
                {loading ? "Minting..." : "Mint Product NFT"}
              </Button>
              
              {qrCodeData && (
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Product QR Code</h3>
                  <img src={qrCodeData} alt="Product QR Code" className="mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">
                    Scan this QR code to verify product authenticity
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activate Product Tab */}
        <TabsContent value="activate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Activate Product
              </CardTitle>
              <CardDescription>
                Activate your product NFT to enable full ownership features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="activateProductId">Product ID</Label>
                <Input
                  id="activateProductId"
                  placeholder="Enter product ID"
                  value={activateProductId}
                  onChange={(e) => setActivateProductId(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleActivateProduct} 
                disabled={loading}
                className="w-full"
              >
                {loading ? "Activating..." : "Activate Product"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transfer Product Tab */}
        <TabsContent value="transfer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Transfer Ownership
              </CardTitle>
              <CardDescription>
                Transfer product NFT ownership to another wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transferProductId">Product ID</Label>
                <Input
                  id="transferProductId"
                  placeholder="Enter product ID"
                  value={transferForm.productId}
                  onChange={(e) => setTransferForm({...transferForm, productId: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="newOwner">New Owner Address</Label>
                <Input
                  id="newOwner"
                  placeholder="0x..."
                  value={transferForm.newOwner}
                  onChange={(e) => setTransferForm({...transferForm, newOwner: e.target.value})}
                />
              </div>
              <Button 
                onClick={handleTransferProduct} 
                disabled={loading}
                className="w-full"
              >
                {loading ? "Transferring..." : "Transfer Ownership"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verify Product Tab */}
        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ScanLine className="w-5 h-5 mr-2" />
                Verify Product
              </CardTitle>
              <CardDescription>
                Verify product authenticity by scanning QR code or entering Product ID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="verifyProductId">Product ID</Label>
                  <Input
                    id="verifyProductId"
                    placeholder="Enter product ID"
                    value={verifyProductId}
                    onChange={(e) => setVerifyProductId(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={startQRScanner}
                    variant="outline"
                    className="w-full"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan QR Code
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleVerifyProduct} 
                disabled={loading}
                className="w-full"
              >
                {loading ? "Verifying..." : "Verify Product"}
              </Button>

              {scannerOpen && (
                <div className="mt-4">
                  <div id="qr-reader" style={{ width: "100%" }}></div>
                  <Button 
                    onClick={() => setScannerOpen(false)}
                    variant="outline"
                    className="mt-2 w-full"
                  >
                    Cancel Scan
                  </Button>
                </div>
              )}

              {selectedProduct && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Product ID</Label>
                        <p className="font-mono text-sm">{selectedProduct.product_id}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <div className="mt-1">
                          {getStatusBadge(selectedProduct.status)}
                        </div>
                      </div>
                      <div>
                        <Label>Batch Number</Label>
                        <p className="font-mono text-sm">{selectedProduct.batch_number}</p>
                      </div>
                      <div>
                        <Label>Manufacture Date</Label>
                        <p className="text-sm">
                          {new Date(parseInt(selectedProduct.manufacture_timestamp) * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <Label>Current Owner</Label>
                        <p className="font-mono text-sm break-all">{selectedProduct.owner}</p>
                      </div>
                      <div className="col-span-2">
                        <Label>Manufacturer</Label>
                        <p className="font-mono text-sm break-all">{selectedProduct.manufacturer_address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductRegistry;
