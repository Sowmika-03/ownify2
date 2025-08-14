# 🔌 Wallet Connection Guide

## 🎯 **Quick Test: Use the Wallet Test Tab**

Your application now has a dedicated **"🔌 Wallet Test"** tab that will:
- ✅ Show real-time connection status
- ✅ Display network information
- ✅ Provide step-by-step instructions
- ✅ Show wallet and account details
- ✅ Warn if wrong network is selected

## 📋 **Step-by-Step Wallet Setup**

### **1. Install Petra Wallet** (if not already installed)
- Go to: https://petra.app/
- Install the browser extension
- Create or import your wallet

### **2. Configure Petra for Devnet**
- Open Petra Wallet extension
- Click **Settings** (gear icon)
- Go to **Network** settings
- Select **Devnet** from the dropdown
- Confirm the switch

### **3. Connect to Your App**
- Open: http://localhost:5176
- Click the **"🔌 Wallet Test"** tab
- Click **"Connect a Wallet"** in the header
- Select **Petra** from the wallet list
- Approve connection in Petra popup

### **4. Verify Connection**
In the Wallet Test tab, you should see:
- ✅ **Connected**: Green status
- ✅ **Network: Devnet**: Correct network
- ✅ **Wallet: Petra**: Wallet detected
- ✅ **Account Info**: Your wallet address

## ⚠️ **Common Issues & Solutions**

### **Issue: "Wrong Network" Warning**
**Solution**: 
- Open Petra Wallet
- Settings → Network → Select "Devnet"
- Refresh the page

### **Issue: "Simulation Error" Still Appears**
**Solution**: 
- Ensure you're on Devnet
- Check that contract address is: `0x01f1c5a069694aa1bbcec54f09007417cf45dfe4303d37a402c9be2fc741aaca`
- Try disconnecting and reconnecting wallet

### **Issue: Wallet Not Detected**
**Solution**:
- Refresh the browser page
- Make sure Petra extension is enabled
- Try hard refresh (Ctrl+F5)

## 🧪 **Testing the Full Flow**

### **After Successful Connection:**

1. **Go to Product Registry Tab** (🏷️)
2. **Try Minting** a test product:
   - Product ID: `TEST_PRODUCT_001`
   - Batch Number: `BATCH_20240814_001`
   - Manufacturer: `Test Manufacturer`
3. **Check Transaction** in Petra wallet
4. **Test Other Features**: Activate, Transfer, Verify

## 🚀 **Ready for Demo**

Once wallet connection works:
- ✅ Contract is deployed and functional
- ✅ Frontend is connected to correct contract
- ✅ Wallet integration is working
- ✅ All features are testable

## 📱 **Mobile Testing**

For mobile demos:
- Use **localhost:5176** if testing locally
- For remote access, use `npm run dev -- --host`
- Ensure mobile wallet (Petra mobile) is set to Devnet

---

## 🔍 **Current Status Check**

**Contract**: ✅ Deployed at `0x01f1c5a069694aa1bbcec54f09007417cf45dfe4303d37a402c9be2fc741aaca`
**Frontend**: ✅ Running on http://localhost:5176
**Wallet Test**: ✅ Available in dedicated tab
**Network**: ✅ Configured for Devnet

**Your hackathon project is ready for live demonstration!** 🏆
