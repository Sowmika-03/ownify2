import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { ProductMetadata } from './product_registry_abi';

// Contract configuration
export const CONTRACT_ADDRESS = "0x33c632f28dfef2d9668a98066807c3b0b5759fb01edabc80418c5037768b3909";
export const NETWORK = Network.TESTNET; // Change to MAINNET for production

// Initialize Aptos client
const aptosConfig = new AptosConfig({ network: NETWORK });
export const aptos = new Aptos(aptosConfig);

// Contract interaction utilities
export class ProductRegistryClient {
  private contractAddress: string;

  constructor(contractAddress: string = CONTRACT_ADDRESS) {
    this.contractAddress = contractAddress;
  }

  /**
   * Build transaction payload for minting a product NFT
   */
  buildMintProductTransaction(productId: string, batchNumber: string, toAddress: string) {
    return {
      data: {
        function: `${this.contractAddress}::product_registry::mint_product_nft`,
        typeArguments: [],
        functionArguments: [productId, batchNumber, toAddress],
      },
    };
  }

  /**
   * Build transaction payload for activating a product
   */
  buildActivateProductTransaction(productId: string) {
    return {
      data: {
        function: `${this.contractAddress}::product_registry::activate_product`,
        typeArguments: [],
        functionArguments: [productId],
      },
    };
  }

  /**
   * Build transaction payload for transferring product ownership
   */
  buildTransferProductTransaction(productId: string, newOwner: string) {
    return {
      data: {
        function: `${this.contractAddress}::product_registry::transfer_product_ownership`,
        typeArguments: [],
        functionArguments: [productId, newOwner],
      },
    };
  }

  /**
   * Build transaction payload for updating product status
   */
  buildUpdateStatusTransaction(productId: string, newStatus: number) {
    return {
      data: {
        function: `${this.contractAddress}::product_registry::update_product_status`,
        typeArguments: [],
        functionArguments: [productId, newStatus],
      },
    };
  }

  /**
   * Get product metadata by product ID
   */
  async getProductMetadata(productId: string): Promise<ProductMetadata | null> {
    try {
      const result = await aptos.view({
        payload: {
          function: `${this.contractAddress}::product_registry::get_product_metadata`,
          functionArguments: [productId],
        },
      });
      return result[0] as ProductMetadata;
    } catch (error) {
      console.error('Error fetching product metadata:', error);
      return null;
    }
  }

  /**
   * Get product metadata by NFT address
   */
  async getProductByNFT(nftAddress: string): Promise<ProductMetadata | null> {
    try {
      const result = await aptos.view({
        payload: {
          function: `${this.contractAddress}::product_registry::get_product_by_nft`,
          functionArguments: [nftAddress],
        },
      });
      return result[0] as ProductMetadata;
    } catch (error) {
      console.error('Error fetching product by NFT:', error);
      return null;
    }
  }

  /**
   * Get all products for a manufacturer
   */
  async getManufacturerProducts(manufacturerAddress: string): Promise<string[]> {
    try {
      const result = await aptos.view({
        payload: {
          function: `${this.contractAddress}::product_registry::get_manufacturer_products`,
          functionArguments: [manufacturerAddress],
        },
      });
      return result[0] as string[];
    } catch (error) {
      console.error('Error fetching manufacturer products:', error);
      return [];
    }
  }

  /**
   * Verify product authenticity
   */
  async verifyProductAuthenticity(productId: string): Promise<boolean> {
    try {
      const result = await aptos.view({
        payload: {
          function: `${this.contractAddress}::product_registry::verify_product_authenticity`,
          functionArguments: [productId],
        },
      });
      return result[0] as boolean;
    } catch (error) {
      console.error('Error verifying product authenticity:', error);
      return false;
    }
  }

  /**
   * Get total number of products
   */
  async getTotalProducts(): Promise<number> {
    try {
      const result = await aptos.view({
        payload: {
          function: `${this.contractAddress}::product_registry::get_total_products`,
          functionArguments: [],
        },
      });
      return parseInt(result[0] as string);
    } catch (error) {
      console.error('Error fetching total products:', error);
      return 0;
    }
  }

  /**
   * Get status name from status code
   */
  async getStatusName(status: number): Promise<string> {
    try {
      const result = await aptos.view({
        payload: {
          function: `${this.contractAddress}::product_registry::get_product_status_name`,
          functionArguments: [status],
        },
      });
      return result[0] as string;
    } catch (error) {
      console.error('Error fetching status name:', error);
      return 'Unknown';
    }
  }
}

// Export a default instance
export const productRegistryClient = new ProductRegistryClient();

// QR Code utilities
export const QRCodeUtils = {
  /**
   * Generate QR code data for product verification
   */
  generateProductQRData(productId: string, batchNumber: string, contractAddress: string = CONTRACT_ADDRESS) {
    return JSON.stringify({
      productId,
      batchNumber,
      contractAddress,
      type: 'product_verification',
      timestamp: Date.now(),
    });
  },

  /**
   * Parse QR code data
   */
  parseProductQRData(qrCodeData: string) {
    try {
      const data = JSON.parse(qrCodeData);
      if (data.type === 'product_verification' && data.productId) {
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      return null;
    }
  },
};

// Utility functions
export const Utils = {
  /**
   * Format timestamp to readable date
   */
  formatTimestamp(timestamp: string | number): string {
    const date = new Date(parseInt(timestamp.toString()) * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  },

  /**
   * Truncate address for display
   */
  truncateAddress(address: string, chars: number = 4): string {
    if (address.length <= chars * 2 + 2) return address;
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  },

  /**
   * Generate random product ID
   */
  generateProductId(prefix: string = 'PROD'): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  },

  /**
   * Generate batch number
   */
  generateBatchNumber(prefix: string = 'BATCH'): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 3);
    return `${prefix}-${year}${month}${day}-${random}`.toUpperCase();
  },

  /**
   * Validate Aptos address
   */
  isValidAptosAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]+$/.test(address) && address.length >= 3;
  },
};
