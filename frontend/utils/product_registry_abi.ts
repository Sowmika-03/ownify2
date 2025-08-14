export const PRODUCT_REGISTRY_ABI = {
  address: "0x33c632f28dfef2d9668a98066807c3b0b5759fb01edabc80418c5037768b3909",
  name: "product_registry",
  friends: [],
  exposed_functions: [
    {
      name: "mint_product_nft",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "0x1::string::String", "address"],
      return: []
    },
    {
      name: "activate_product",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String"],
      return: []
    },
    {
      name: "transfer_product_ownership",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "address"],
      return: []
    },
    {
      name: "update_product_status",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "u8"],
      return: []
    },
    {
      name: "get_product_metadata",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["0x1::string::String"],
      return: ["product_registry_addr::product_registry::ProductMetadata"]
    },
    {
      name: "get_product_by_nft",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["address"],
      return: ["product_registry_addr::product_registry::ProductMetadata"]
    },
    {
      name: "get_manufacturer_products",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["address"],
      return: ["vector<0x1::string::String>"]
    },
    {
      name: "get_total_products",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: [],
      return: ["u64"]
    },
    {
      name: "verify_product_authenticity",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["0x1::string::String"],
      return: ["bool"]
    },
    {
      name: "get_product_status_name",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["u8"],
      return: ["0x1::string::String"]
    }
  ],
  structs: [
    {
      name: "ProductMetadata",
      is_native: false,
      abilities: ["copy", "drop", "store", "key"],
      generic_type_params: [],
      fields: [
        { name: "product_id", type: "0x1::string::String" },
        { name: "nft_address", type: "address" },
        { name: "manufacturer_address", type: "address" },
        { name: "batch_number", type: "0x1::string::String" },
        { name: "manufacture_timestamp", type: "u64" },
        { name: "status", type: "u8" },
        { name: "owner", type: "address" },
        { name: "activation_timestamp", type: "0x1::option::Option<u64>" }
      ]
    }
  ]
} as const;

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
