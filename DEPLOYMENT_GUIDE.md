# 🚀 Product Registry Deployment & Troubleshooting Guide

## Quick Start Guide

### 1. Environment Setup

Make sure your `.env` file in the root directory contains:

```bash
PROJECT_NAME=nft
VITE_APP_NETWORK=devnet
VITE_APTOS_API_KEY=""
VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS=0x1
VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY=
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application should be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🔧 Common Issues & Solutions

### Issue 1: Environment Variable Not Set Error

**Error:** `VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS variable is not set`

**Solution:**
1. Create or update `.env` file in root directory
2. Add: `VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS=0x1`
3. Restart the development server

### Issue 2: Move Compilation Errors

**Error:** Various Move compilation errors

**Solution:**
1. Update `contract/Move.toml` addresses:
   ```toml
   [addresses]
   message_board_addr = "0x1"
   product_registry_addr = "0x1"
   ```
2. Run: `npm run move:compile`

### Issue 3: Frontend Module Not Found Errors

**Error:** `Cannot find module '@/components/...'`

**Solution:**
1. Check `tsconfig.json` has correct path mapping
2. Ensure all UI components exist in `frontend/components/ui/`
3. Restart development server

### Issue 4: Wallet Connection Issues

**Error:** Wallet connection fails or undefined

**Solution:**
1. Install Petra Wallet browser extension
2. Switch to Devnet in Petra settings
3. Ensure wallet is unlocked
4. Refresh the page

## 🌐 Localhost Access

### For Local Development

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Open browser to `http://localhost:5175` (or the port shown in terminal)
   - Connect Petra Wallet
   - Switch to Devnet network

### For Network Access

1. **Start with host flag:**
   ```bash
   npm run dev -- --host
   ```

2. **Access from other devices:**
   - Use your computer's IP address
   - Example: `http://192.168.1.100:5175`

## 📱 Demo Mode (Without Blockchain)

The application includes demo functionality that works without blockchain deployment:

### Features Available in Demo Mode:
- ✅ UI/UX testing
- ✅ QR code generation
- ✅ QR code scanning
- ✅ Form validation
- ✅ Product verification simulation

### Features Requiring Blockchain:
- ❌ Actual NFT minting
- ❌ Real ownership transfer
- ❌ On-chain verification

## 🔄 Complete Deployment Process

### Step 1: Prepare Aptos Account

```bash
# Install Aptos CLI
# Visit: https://aptos.dev/tools/aptos-cli/install-cli/

# Initialize account
aptos init

# Fund account (for devnet)
aptos account fund-with-faucet --account <your-address>
```

### Step 2: Update Configuration

1. **Update `.env`:**
   ```bash
   VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS=<your-wallet-address>
   VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY=<your-private-key>
   ```

2. **Update `contract/Move.toml`:**
   ```toml
   [addresses]
   product_registry_addr = "<your-wallet-address>"
   ```

### Step 3: Deploy Smart Contract

```bash
# Compile
npm run move:compile

# Deploy
npm run move:publish
```

### Step 4: Update Frontend

Update contract address in `frontend/utils/product_registry_abi.ts`:
```typescript
export const PRODUCT_REGISTRY_ABI = {
  address: "<deployed-contract-address>",
  // ... rest of ABI
};
```

### Step 5: Test Deployment

1. Start frontend: `npm run dev`
2. Connect Petra Wallet
3. Switch to appropriate network (devnet/testnet/mainnet)
4. Test minting functionality

## 🧪 Testing Features

### Test QR Code Generation
1. Go to Mint NFT tab
2. Fill in product details
3. Click "Mint Product NFT"
4. QR code should appear below

### Test QR Code Scanning
1. Generate a QR code (or use demo)
2. Go to Verify tab
3. Click "Scan QR Code"
4. Point camera at QR code
5. Product details should load

### Test Wallet Integration
1. Connect Petra Wallet
2. Ensure correct network (devnet recommended)
3. Check wallet address displays in header
4. Test transaction signing

## 📊 Network Configurations

### Devnet (Recommended for Testing)
- **Network:** Devnet
- **Explorer:** https://explorer.aptoslabs.com/?network=devnet
- **Faucet:** Built into Petra Wallet
- **Cost:** Free

### Testnet
- **Network:** Testnet  
- **Explorer:** https://explorer.aptoslabs.com/?network=testnet
- **Faucet:** Available
- **Cost:** Free

### Mainnet (Production)
- **Network:** Mainnet
- **Explorer:** https://explorer.aptoslabs.com/
- **Faucet:** None (real APT required)
- **Cost:** Real transaction fees

## 🔍 Debugging Tools

### Browser Developer Tools
1. Open F12 in browser
2. Check Console for JavaScript errors
3. Check Network tab for failed requests
4. Check Application tab for wallet connection

### Terminal Logs
1. Monitor development server output
2. Check for compilation errors
3. Watch for hot reload issues

### Aptos Explorer
1. Verify transactions on explorer
2. Check account balance
3. View contract deployment status

## 📞 Support

If you encounter issues:

1. **Check this guide first**
2. **Verify environment variables**
3. **Restart development server**
4. **Clear browser cache**
5. **Check Aptos network status**

For additional help:
- [Aptos Developer Documentation](https://aptos.dev)
- [Petra Wallet Support](https://petra.app/)
- [GitHub Issues](https://github.com/aptos-labs/aptos-core/issues)

## 🎯 Production Checklist

Before deploying to production:

- [ ] Update all placeholder addresses
- [ ] Set strong private keys
- [ ] Configure proper environment variables
- [ ] Test on testnet thoroughly
- [ ] Audit smart contract code
- [ ] Set up monitoring
- [ ] Configure domain and SSL
- [ ] Test wallet integrations
- [ ] Verify QR code functionality
- [ ] Test mobile responsiveness

---

**Happy Building! 🚀**
