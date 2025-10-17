import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

// Internal Components
import { Header } from "@/components/Header";
import { TopBanner } from "@/components/TopBanner";
import ProductRegistry from "@/components/ProductRegistry";
import DemoPage from "@/components/DemoPage";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import LandingPage from '@/components/LandingPage';

function App() {
  const { connected } = useWallet();
  const [currentView, setCurrentView] = useState<'demo' | 'registry'>('demo');

  // If the wallet is not connected, show the landing page.
  if (!connected) {
    return <LandingPage />;
  }

  // If the wallet is connected, show the main application.
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
              🏷️ Ownership Tracker
            </Button>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {currentView === 'demo' ? <DemoPage /> : <ProductRegistry />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
