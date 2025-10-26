import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();

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
            <Button asChild variant={location.pathname === '/' ? 'default' : 'outline'}>
              <Link to="/" className="font-medium">🏠 Demo Home</Link>
            </Button>
            <Button asChild variant={location.pathname.startsWith('/registry') || location.pathname.startsWith('/verify') ? 'default' : 'outline'}>
              <Link to="/registry" className="font-medium">🏷️ Ownership Tracker</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<DemoPage />} />
          <Route path="/registry" element={<ProductRegistry />} />
          <Route path="/verify" element={<ProductRegistry />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
