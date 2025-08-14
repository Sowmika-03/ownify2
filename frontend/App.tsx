import { useState } from 'react';
// Internal Components
import { Header } from "@/components/Header";
import { TopBanner } from "@/components/TopBanner";
import ProductRegistry from "@/components/ProductRegistry";
import DemoPage from "@/components/DemoPage";
import WalletConnectionTest from "@/components/WalletConnectionTest";
import ContractDebugger from "@/components/ContractDebugger";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

function App() {
  const [currentView, setCurrentView] = useState<'demo' | 'registry' | 'wallet-test' | 'debug'>('demo');

  return (
    <>
      <TopBanner />
      <Header />
      
      {/* Navigation */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 py-4">
            <Button 
              variant={currentView === 'demo' ? 'default' : 'outline'}
              onClick={() => setCurrentView('demo')}
              className="font-medium"
            >
              🏠 Demo Home
            </Button>
            <Button 
              variant={currentView === 'registry' ? 'default' : 'outline'}
              onClick={() => setCurrentView('registry')}
              className="font-medium"
            >
              🏷️ Product Registry
            </Button>
            <Button 
              variant={currentView === 'wallet-test' ? 'default' : 'outline'}
              onClick={() => setCurrentView('wallet-test')}
              className="font-medium"
            >
              🔌 Wallet Test
            </Button>
            <Button 
              variant={currentView === 'debug' ? 'default' : 'outline'}
              onClick={() => setCurrentView('debug')}
              className="font-medium"
            >
              🔧 Debug
            </Button>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {currentView === 'demo' ? <DemoPage /> : 
         currentView === 'registry' ? <ProductRegistry /> : 
         currentView === 'wallet-test' ? <WalletConnectionTest /> :
         <ContractDebugger />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
