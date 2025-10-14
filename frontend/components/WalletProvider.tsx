import { PropsWithChildren } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

// Internal components
import { useToast } from "@/components/ui/use-toast";
// Internal constants
import { NETWORK } from "@/constants";

// Map the string network from constants.ts to the Network enum from the SDK
const networkEnum = 
  NETWORK === "mainnet" ? Network.MAINNET
  : NETWORK === "devnet" ? Network.DEVNET
  : Network.TESTNET;

export function WalletProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: networkEnum }}
      onError={(error) => {
        // Ensure error is a string before passing to toast
        const description = error instanceof Error ? error.message : String(error || "Unknown wallet error");
        toast({
          variant: "destructive",
          title: "Wallet Error",
          description: description,
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}