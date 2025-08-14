import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCode from 'qrcode';
import { Download } from "lucide-react";

const QRCodeGenerator: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQR = async () => {
    if (!productId || !batchNumber) {
      alert('Please fill in all fields');
      return;
    }

    const qrData = JSON.stringify({
      productId,
      batchNumber,
      contractAddress: "0x33c632f28dfef2d9668a98066807c3b0b5759fb01edabc80418c5037768b3909",
      type: 'product_verification',
      timestamp: Date.now(),
    });

    try {
      const url = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `product-${productId}-qr.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Generate QR codes for product verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="productId">Product ID</Label>
          <Input
            id="productId"
            placeholder="e.g., SHOE-001-2024"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="batchNumber">Batch Number</Label>
          <Input
            id="batchNumber"
            placeholder="e.g., BATCH-2024-001"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
        </div>
        <Button onClick={generateQR} className="w-full">
          Generate QR Code
        </Button>
        
        {qrCodeUrl && (
          <div className="text-center space-y-4">
            <img src={qrCodeUrl} alt="Product QR Code" className="mx-auto" />
            <Button onClick={downloadQR} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
