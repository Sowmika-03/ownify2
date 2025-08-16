## 🏷️ NFT-Based Product Ownership System

A full-stack decentralized application built on the **Aptos blockchain** that enables **NFT-based proof of product ownership** with comprehensive lifecycle management.

## 🌟 Features

### Smart Contract (Move)
- **Mint Product NFTs**: Create unique NFTs representing physical products
- **Activate Products**: Change product status from minted to active
- **Transfer Ownership**: Securely transfer product ownership between users
- **Verify Authenticity**: Validate product authenticity and ownership
- **Comprehensive Metadata**: Track product ID, batch number, manufacturing details

### Frontend (React + TypeScript)
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Wallet Integration**: Seamless Petra wallet connectivity
- **QR Code System**: Generate and scan QR codes for product verification
- **Real-time Updates**: Live transaction status and notifications
- **Responsive Design**: Mobile-friendly interface

## 🚀 Live Demo

- **Contract Address**: `0xa1eb5bbcc1bde72fb955e49fc7e58701e7868e3c7158efda014faff566fe055f`
- **Network**: Aptos Testnet

## 🛠️ Tech Stack

### Blockchain
- **Aptos**: Layer 1 blockchain
- **Move**: Smart contract programming language
- **Token Objects**: NFT standard implementation

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component library

### Integration
- **@aptos-labs/wallet-adapter-react**: Wallet connectivity
- **@thalalabs/surf**: Type-safe contract interactions
- **QR Code Libraries**: Product verification system

## 🏃‍♂️ Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd nft-product-ownership
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Connect Wallet & Test
1. Open http://localhost:5178/
2. Connect your Petra wallet
3. Ensure you're on Aptos Testnet
4. Mint your first product NFT!

## 📖 Usage Guide

### Minting Product NFTs
1. Navigate to the "Mint NFT" tab
2. Enter Product ID (e.g., "SHOE-001-2024")
3. Enter Batch Number (e.g., "BTC-2024-001")
4. Owner address auto-fills with your wallet
5. Click "Mint Product NFT"

### Activating Products
1. Go to "Activate" tab
2. Enter the Product ID to activate
3. Confirm transaction

### Transferring Ownership
1. Select "Transfer" tab
2. Enter Product ID and new owner's address
3. Complete the transfer

### Verifying Authenticity
1. Use "Verify" tab
2. Enter Product ID or scan QR code
3. View comprehensive product details

## 🏗️ Project Structure

```
├── contract/                 # Move smart contracts
│   ├── sources/
│   │   └── product_registry.move
│   └── Move.toml
├── frontend/                 # React application
│   ├── components/           # UI components
│   ├── utils/               # Blockchain utilities
│   └── view-functions/      # Contract queries
├── scripts/                 # Build scripts
└── public/                  # Static assets

## Screenshots

```
##ScreenShots
<img width="1887" height="841" alt="Screenshot 2025-08-14 130107" src="https://github.com/user-attachments/assets/5d0759d2-c292-4fee-8e17-047cdbf6449a" />
<img width="1876" height="953" alt="Screenshot 2025-08-14 130130" src="https://github.com/user-attachments/assets/13fad119-8d48-47a2-8c7c-8ee1508dd05d" />
<img width="1884" height="939" alt="Screenshot 2025-08-14 130159" src="https://github.com/user-attachments/assets/6ed78a0e-17a8-4339-8e9c-3754f5c4f292" />
<img width="1878" height="952" alt="Screenshot 2025-08-14 130244" src="https://github.com/user-attachments/assets/3661d480-758b-4e9a-9ace-84749debde0c" />
<img width="1873" height="901" alt="Screenshot 2025-08-14 130321" src="https://github.com/user-attachments/assets/514ae513-df11-4288-a08c-a46e4232d1c3" />



## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Move contracts
npm run move:compile    # Compile contracts
npm run move:test       # Run contract tests
npm run move:publish    # Deploy to testnet
```

## 🌐 Contract Functions

### Public Functions
- `mint_product_nft()`: Create new product NFT
- `activate_product()`: Activate minted product
- `transfer_product_ownership()`: Transfer ownership
- `verify_product_authenticity()`: Verify product details

### View Functions
- `get_total_products()`: Get total product count
- `get_product_details()`: Get specific product info

## 🔐 Security Features

- **Ownership Verification**: Only owners can transfer products
- **Status Management**: Proper product lifecycle enforcement
- **Event Logging**: Complete audit trail for all operations
- **Access Control**: Function-level permissions

## 🎯 Use Cases

1. **Luxury Goods**: Authenticity verification for high-value items
2. **Electronics**: Warranty and ownership tracking
3. **Collectibles**: Provenance and authenticity proof
4. **Supply Chain**: End-to-end product tracking
5. **Second-hand Markets**: Verified ownership transfers

## 🛡️ Testing

The smart contract has been thoroughly tested on Aptos Testnet:
- ✅ Contract deployment successful
- ✅ All functions working as expected
- ✅ Wallet integration functional
- ✅ Gas fee management resolved

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the Aptos ecosystem**

## Read the Boilerplate template docs

To get started with the Boilerplate template and learn more about the template functionality and usage, head over to the [Boilerplate template docs](https://learn.aptoslabs.com/en/dapp-templates/boilerplate-template)

## The Boilerplate template provides:

- **Folder structure** - A pre-made dapp folder structure with a `frontend` and `contract` folders.
- **Dapp infrastructure** - All required dependencies a dapp needs to start building on the Aptos network.
- **Wallet Info implementation** - Pre-made `WalletInfo` components to demonstrate how one can use to read a connected Wallet info.
- **Transfer APT implementation** - Pre-made `transfer` components to send APT to an address.
- **Message board functionality implementation** - Pre-made `message` components to send and read a message on chain

## What tools the template uses?

- React framework
- Vite development tool
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Node based Move commands
- [Vite-pwa](https://vite-pwa-org.netlify.app/)

## What Move commands are available?

The tool utilizes [aptos-cli npm package](https://github.com/aptos-labs/aptos-cli) that lets us run Aptos CLI in a Node environment.

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run move:publish` - a command to publish the Move contract
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run dev` - a command to run the frontend locally
- `npm run deploy` - a command to deploy the dapp to Vercel

For all other available CLI commands, can run `npx aptos` and see a list of all available commands.
#
