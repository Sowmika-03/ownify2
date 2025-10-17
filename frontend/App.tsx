import { useState } from 'react';
// Internal Components
import { Header } from "@/components/Header";
import { TopBanner } from "@/components/TopBanner";
import ProductRegistry from "@/components/ProductRegistry";
import DemoPage from "@/components/DemoPage";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

function App() {

  const [currentView, setCurrentView] = useState<'demo' | 'registry'>('demo');



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
