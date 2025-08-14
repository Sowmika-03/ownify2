# NFT-based Proof of Product Ownership on Aptos

A full-stack decentralized application that links physical products with unique NFTs to provide proof of ownership, warranty tracking, and authenticity verification on the Aptos blockchain.

## 🌟 Features

### Smart Contract Features
- **Product NFT Minting**: Manufacturers can mint unique NFTs for products with metadata
- **Product Activation**: Buyers can activate their products to enable full ownership features
- **Ownership Transfer**: Seamless transfer of product ownership through NFT transfers
- **Status Tracking**: Track product lifecycle (Minted, Active, Locked/Service, Retired)
- **Authenticity Verification**: On-chain verification of product authenticity
- **Manufacturer Registry**: Track all products by manufacturer

### Frontend Features
- **Wallet Integration**: Full Petra Wallet integration with Aptos
- **Modern UI**: Clean, responsive design using Tailwind CSS and Radix UI components
- **QR Code Generation**: Generate QR codes for physical products
- **QR Code Scanning**: Scan QR codes to verify product authenticity
- **Real-time Updates**: Live transaction status and success/error notifications
- **Product Management**: Complete product lifecycle management interface

## 🏗️ Project Structure

```
├── contract/
│   ├── sources/
│   │   └── product_registry.move    # Main smart contract
│   └── Move.toml                    # Move package configuration
├── frontend/
│   ├── components/
│   │   ├── ProductRegistry.tsx      # Main product management interface
│   │   ├── Header.tsx               # Application header
│   │   └── ui/                      # Reusable UI components
│   ├── utils/
│   │   ├── product_registry_abi.ts  # Contract ABI and types
│   │   └── productRegistryClient.ts # Contract interaction utilities
│   └── App.tsx                      # Main application component
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Aptos CLI
- Petra Wallet browser extension

### 1. Install Dependencies

```bash
npm install
```

### 2. Smart Contract Deployment

1. **Configure your wallet**:
   ```bash
   aptos init
   ```

2. **Update Move.toml with your addresses**:
   ```toml
   [addresses]
   product_registry_addr = "YOUR_WALLET_ADDRESS"
   ```

3. **Compile the contract**:
   ```bash
   npm run move:compile
   ```

4. **Deploy to devnet**:
   ```bash
   npm run move:publish
   ```

5. **Update contract address in frontend**:
   - Copy the deployed contract address
   - Update `PRODUCT_REGISTRY_ABI.address` in `frontend/utils/product_registry_abi.ts`

### 3. Start the Frontend

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 How to Use

### For Manufacturers

1. **Connect Wallet**: Click "Connect Wallet" and select Petra Wallet
2. **Mint Product NFT**:
   - Go to the "Mint NFT" tab
   - Enter Product ID (e.g., SHOE-001-2024)
   - Enter Batch Number (e.g., BATCH-2024-001)
   - Enter owner address (buyer's wallet)
   - Click "Mint Product NFT"
3. **QR Code Generation**: After minting, a QR code is automatically generated for the product
4. **Print QR Code**: Attach the QR code to the physical product

### For Product Owners

1. **Activate Product**:
   - Go to the "Activate" tab
   - Enter the Product ID from your purchase
   - Click "Activate Product"

2. **Transfer Ownership**:
   - Go to the "Transfer" tab
   - Enter Product ID
   - Enter new owner's wallet address
   - Click "Transfer Ownership"

### For Anyone (Verification)

1. **Manual Verification**:
   - Go to the "Verify" tab
   - Enter Product ID
   - Click "Verify Product"

2. **QR Code Scanning**:
   - Go to the "Verify" tab
   - Click "Scan QR Code"
   - Point camera at product QR code
   - Product details will be displayed automatically

## 🔧 Smart Contract Functions

### Entry Functions (Transactions)
- `mint_product_nft(product_id, batch_number, to_address)` - Mint new product NFT
- `activate_product(product_id)` - Activate a product NFT
- `transfer_product_ownership(product_id, new_owner)` - Transfer ownership
- `update_product_status(product_id, new_status)` - Update product status

### View Functions (Queries)
- `get_product_metadata(product_id)` - Get complete product information
- `verify_product_authenticity(product_id)` - Check if product exists
- `get_manufacturer_products(manufacturer_address)` - Get all products by manufacturer
- `get_total_products()` - Get total number of products minted

## 🎨 Product Status Types

- **Minted (1)**: Product NFT created but not yet activated
- **Active (2)**: Product activated by owner, full features enabled
- **Locked/Service (3)**: Product temporarily locked for service/repair
- **Retired (4)**: Product retired from active use

## 🔐 Security Features

- **Ownership Verification**: Only current owner can activate or transfer products
- **Manufacturer Authorization**: Only manufacturer can mint products and update certain statuses
- **Immutable Records**: All product history stored on-chain
- **Tamper-Proof QR Codes**: QR codes contain cryptographic verification data

## 🛠️ Technical Stack

### Smart Contract
- **Language**: Move
- **Blockchain**: Aptos
- **Token Standard**: Aptos Token Objects
- **Features**: View functions, entry functions, events

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Wallet**: Petra Wallet integration via @aptos-labs/wallet-adapter-react
- **QR Codes**: qrcode (generation) + html5-qrcode (scanning)
- **Icons**: Lucide React

## 🌍 Deployment Options

### Testnet/Devnet
- Low cost for testing
- Fast transactions
- Perfect for development and demos

### Mainnet
- Production deployment
- Real economic value
- Update network configuration in `productRegistryClient.ts`

## 📝 Example Use Cases

1. **Luxury Goods**: Verify authenticity of designer items
2. **Electronics**: Track warranty and ownership for devices
3. **Automotive**: Digital car titles and service records
4. **Art & Collectibles**: Prove provenance and ownership
5. **Pharmaceuticals**: Track medication authenticity and supply chain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the Apache 2.0 License.

## 🆘 Support

For support, please:
1. Check the [Aptos Developer Documentation](https://aptos.dev)
2. Join the [Aptos Discord](https://discord.gg/aptoslabs)
3. Create an issue in this repository

---

**Happy Building! 🚀**

*This project demonstrates the power of blockchain technology for real-world product ownership and authenticity verification.*
