🏷️ NFT-Based Product Ownership System
A full-stack decentralized application built on the Aptos blockchain that enables NFT-based proof of product ownership with comprehensive lifecycle management.

🌟 Features
Smart Contract (Move)
Mint Product NFTs: Create unique NFTs representing physical products.

Activate Products: Change product status from minted to active.

Transfer Ownership: Securely transfer product ownership between users.

Verify Authenticity: Validate product authenticity and ownership.

Comprehensive Metadata: Track product ID, batch number, manufacturing details.

Frontend (React + TypeScript)
Modern UI: Built with Tailwind CSS and Radix UI components.

Wallet Integration: Seamless Petra wallet connectivity.

QR Code System: Generate and scan QR codes for product verification.

Real-time Updates: Live transaction status and notifications.

Responsive Design: Mobile-friendly interface.

🚀 Live Demo
Contract Address: 0xa1eb5bbcc1bde72fb955e49fc7e58701e7868e3c7158efda014faff566fe055f

Network: Aptos Testnet

🛠️ Tech Stack
Blockchain
Aptos: Layer 1 blockchain.

Move: Smart contract programming language.

Token Objects: NFT standard implementation.

Frontend
React 18: UI framework.

TypeScript: Type safety.

Vite: Build tool and dev server.

Tailwind CSS: Utility-first styling.

Radix UI: Accessible component library.

Integration
@aptos-labs/wallet-adapter-react: Wallet connectivity.

@thalalabs/surf: Type-safe contract interactions.

QR Code Libraries: Product verification system.

🏃♂️ Quick Start
1. Clone the Repository
bash
git clone <your-repo-url>
cd nft-product-ownership
2. Install Dependencies
bash
npm install
3. Start Development Server
bash
npm run dev
4. Connect Wallet & Test
Open http://localhost:5178/

Connect your Petra wallet.

Ensure you're on Aptos Testnet.

Mint your first product NFT!

📖 Usage Guide
Minting Product NFTs
Navigate to the Mint NFT tab.

Enter Product ID (e.g., SHOE-001-2024).

Enter Batch Number (e.g., BTC-2024-001).

Owner address auto-fills with your wallet.

Click Mint Product NFT.

Activating Products
Go to Activate tab.

Enter the Product ID to activate.

Confirm transaction.

Transferring Ownership
Select Transfer tab.

Enter Product ID and new owner's address.

Complete the transfer.

Verifying Authenticity
Use Verify tab.

Enter Product ID or scan QR code.

View comprehensive product details.

🏗️ Project Structure
text
├── contract/            # Move smart contracts
│   ├── sources/
│   │   └── product_registry.move
│   └── Move.toml
├── frontend/            # React application
│   ├── components/      # UI components
│   ├── utils/           # Blockchain utilities
│   └── view-functions/  # Contract queries
├── scripts/             # Build scripts
└── public/              # Static assets
🖼️ Screenshots
<img width="1887" height="841" alt="Screenshot 2025-08-14 130107" src="https://github.com/user-attachments/assets/52af7a2f-5d03-4ff9-8bb7-174ed53fdc72" />
<img width="1876" height="953" alt="Screenshot 2025-08-14 130130" src="https://github.com/user-attachments/assets/5aca18fa-f4dd-4b45-a432-9ec9df4d7d39" />
<img width="1884" height="939" alt="Screenshot 2025-08-14 130159" src="https://github.com/user-attachments/assets/fdfbd92a-3b13-4019-8e07-e72840e02d0f" />
<img width="1878" height="952" alt="Screenshot 2025-08-14 130244" src="https://github.com/user-attachments/assets/9638bea7-2ea4-4b01-b02f-41896685223e" />
<img width="1873" height="901" alt="Screenshot 2025-08-14 130321" src="https://github.com/user-attachments/assets/a8297e29-b364-4f84-822f-97b2335c8297" />



bash
# Development
npm run dev          # Start dev server

# Build for production
npm run build

# Preview production build
npm run preview

# Compile Move contracts
npm run move:compile

# Run contract tests
npm run move:test

# Deploy Move contracts to testnet
npm run move:publish
🌐 Contract Functions
Public Functions
mint_product_nft(): Create new product NFT.

activate_product(): Activate minted product.

transfer_product_ownership(): Transfer ownership.

verify_product_authenticity(): Verify product details.

View Functions
get_total_products(): Get total product count.

get_product_details(): Get specific product info.

🔐 Security Features
Ownership Verification: Only owners can transfer products.

Status Management: Proper product lifecycle enforcement.

Event Logging: Complete audit trail for all operations.

Access Control: Function-level permissions.

🎯 Use Cases
Luxury Goods: Authenticity verification for high-value items.

Electronics: Warranty and ownership tracking.

Collectibles: Provenance and authenticity proof.

Supply Chain: End-to-end product tracking.

Second-hand Markets: Verified ownership transfers.

🛡️ Testing
✅ Contract deployment successful

✅ All functions working as expected

✅ Wallet integration functional

✅ Gas fee management resolved

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

Built with ❤️ for the Aptos ecosystem

📝 Additional Resources
Boilerplate template docs

Aptos CLI npm package

Vite-pwa documentation
