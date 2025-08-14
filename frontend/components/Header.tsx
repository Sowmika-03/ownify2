import { WalletSelector } from "./WalletSelector";

export function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto w-full flex-wrap border-b bg-white/80 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-gray-900">🏷️ Product Registry</h1>
        <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded-full">NFT Proof of Ownership</span>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <WalletSelector />
      </div>
    </div>
  );
}
