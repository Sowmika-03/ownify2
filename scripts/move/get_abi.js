require("dotenv").config();
const fs = require("node:fs");

// The address should be the one the contract is published to.
const contractAddress = process.env.VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS;

if (!contractAddress) {
  throw new Error("VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS is not set in your .env file.");
}

const modules = [
  { address: contractAddress, name: "product_registry" },
  { address: contractAddress, name: "message_board" }, // Keep this as it's part of the original template
  { address: "0x1", name: "coin" },
];

async function getAbi() {
  console.log("Fetching ABIs from the blockchain...");
  // Wait for 10 seconds to ensure the module is deployed and indexed by the API
  await new Promise((resolve) => setTimeout(resolve, 10000));

  for (const module of modules) {
    const url = `https://fullnode.${process.env.VITE_APP_NETWORK || 'testnet'}.aptoslabs.com/v1/accounts/${module.address}/module/${module.name}`;
    console.log(`Fetching from: ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Error fetching ABI for ${module.name}. Status: ${response.status}.`);
        // If it's a 404, the module might not exist at that address.
        if (response.status === 404) {
          console.error(`Module '${module.name}' not found at address '${module.address}'. This might be expected if the module is not part of your project. Skipping.`);
        }
        continue; // Skip to the next module
      }
      const data = await response.json();
      const abi = data.abi;

      if (!abi) {
        console.error(`ABI not found in response for module ${module.name}.`);
        continue;
      }

      const abiString = `export const ${module.name.toUpperCase()}_ABI = ${JSON.stringify(abi, null, 2)} as const;`;
      const filePath = `frontend/utils/${module.name}_abi.ts`;
      fs.writeFileSync(filePath, abiString);

      // If this is the product_registry module, append the static content.
      if (module.name === 'product_registry') {
        const staticContent = `

// Product status constants
export const PRODUCT_STATUS = {
  MINTED: 1,
  ACTIVE: 2,
  LOCKED_SERVICE: 3,
  RETIRED: 4
} as const;

// Status labels for UI
export const PRODUCT_STATUS_LABELS = {
  1: "Minted",
  2: "Active", 
  3: "Locked/Service",
  4: "Retired"
} as const;

// Type definitions for TypeScript
export interface ProductMetadata {
  product_id: string;
  nft_address: string;
  manufacturer_address: string;
  batch_number: string;
  manufacture_timestamp: string;
  status: number;
  owner: string;
  activation_timestamp?: string;
}
`;
        fs.appendFileSync(filePath, staticContent);
      }

      console.log(`✅ ${module.name} ABI saved to ${filePath}`);

    } catch (error) {
      console.error(`Failed to process ABI for ${module.name}:`, error);
    }
  }
}

getAbi();