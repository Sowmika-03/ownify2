import React, { useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useWalletClient } from "@thalalabs/surf/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PRODUCT_REGISTRY_ABI } from '@/utils/product_registry_abi';
import { aptosClient } from '@/utils/aptosClient';

const ContractDebugger: React.FC = () => {
  const { account, connected } = useWallet();
  const { client } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testViewFunction = async () => {
    try {
      setLoading(true);
      addResult("Testing view function...");
      
      // Try to call a simple view function
      const result = await aptosClient().view({
        payload: {
          function: `${PRODUCT_REGISTRY_ABI.address}::product_registry::get_manufacturer_products`,
          functionArguments: [account?.address.toString()],
        },
      });
      
      addResult(`✅ View function success: ${JSON.stringify(result)}`);
    } catch (error: any) {
      addResult(`❌ View function error: ${error.message}`);
      console.error("View function error:", error);
    } finally {
      setLoading(false);
    }
  };

  const testSimpleMint = async () => {
    if (!client || !account) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      addResult("Testing simple mint...");
      
      const productId = `TEST_${Date.now()}`;
      const batchNumber = `BATCH_${Date.now()}`;
      const toAddress = account.address.toString();
      
      addResult(`Minting product: ${productId}`);
      addResult(`Batch: ${batchNumber}`);
      addResult(`To address: ${toAddress}`);
      addResult(`Using contract: ${PRODUCT_REGISTRY_ABI.address}`);
      
      // Check if account has sufficient funds
      try {
        const accountData = await aptosClient().getAccountInfo({
          accountAddress: account.address.toString()
        });
        addResult(`Account sequence: ${accountData.sequence_number}`);
      } catch (e) {
        addResult(`⚠️ Could not get account info: ${e}`);
      }
      
      const committedTransaction = await client.useABI(PRODUCT_REGISTRY_ABI).mint_product_nft({
        type_arguments: [],
        arguments: [
          productId,
          batchNumber,
          toAddress as `0x${string}`
        ],
      });

      addResult(`✅ Transaction submitted: ${committedTransaction.hash}`);
      
      // Wait for transaction
      const txnResult = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      
      addResult(`✅ Transaction confirmed! Gas used: ${txnResult.gas_used}`);
      
      // Verify the product was created
      try {
        const productData = await aptosClient().view({
          payload: {
            function: `${PRODUCT_REGISTRY_ABI.address}::product_registry::get_product_metadata`,
            functionArguments: [productId],
          },
        });
        addResult(`✅ Product verified: ${JSON.stringify(productData[0])}`);
      } catch (e) {
        addResult(`⚠️ Could not verify product: ${e}`);
      }
      
      toast({
        title: "Success",
        description: `Product ${productId} minted successfully!`,
      });

    } catch (error: any) {
      addResult(`❌ Mint error: ${error.message}`);
      addResult(`❌ Full error: ${JSON.stringify(error)}`);
      console.error("Full mint error:", error);
      
      // Check if it's a simulation error
      if (error.message?.includes('simulation')) {
        addResult(`💡 This appears to be a simulation error`);
        addResult(`💡 Try checking: wallet network, gas balance, unique product ID`);
      }
      
      toast({
        title: "Mint Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testContractExists = async () => {
    try {
      setLoading(true);
      addResult("Checking if contract exists...");
      
      const response = await fetch(`https://api.devnet.aptoslabs.com/v1/accounts/${PRODUCT_REGISTRY_ABI.address}/module/product_registry`);
      
      if (response.ok) {
        const moduleData = await response.json();
        addResult(`✅ Contract exists! Functions: ${moduleData.exposed_functions?.length || 0}`);
      } else {
        const error = await response.text();
        addResult(`❌ Contract check failed: ${error}`);
      }
    } catch (error: any) {
      addResult(`❌ Contract check error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Contract Debugger</CardTitle>
          <CardDescription>
            Debug and test smart contract interactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Wallet Status</h3>
              <p className="text-sm text-gray-600">
                {connected ? `✅ Connected: ${account?.address.toString().slice(0, 8)}...` : '❌ Not connected'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Contract Address</h3>
              <p className="text-xs text-gray-600 break-all">
                {PRODUCT_REGISTRY_ABI.address}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Network</h3>
              <p className="text-sm text-gray-600">Aptos Devnet</p>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={testContractExists} 
              disabled={loading}
              variant="outline"
            >
              1. Check Contract
            </Button>
            <Button 
              onClick={testViewFunction} 
              disabled={loading || !connected}
              variant="outline"
            >
              2. Test View Function
            </Button>
            <Button 
              onClick={testSimpleMint} 
              disabled={loading || !connected}
            >
              3. Test Mint
            </Button>
            <Button 
              onClick={clearResults} 
              variant="outline"
            >
              Clear Results
            </Button>
          </div>

          {/* Results */}
          {testResults.length > 0 && (
            <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
              <h3 className="font-medium mb-3">Test Results:</h3>
              <div className="space-y-1 text-sm font-mono">
                {testResults.map((result, index) => (
                  <div key={index} className={`${
                    result.includes('❌') ? 'text-red-600' : 
                    result.includes('✅') ? 'text-green-600' : 
                    'text-gray-700'
                  }`}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600">Testing...</p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDebugger;
