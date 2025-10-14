export const PRODUCT_REGISTRY_ABI = {
  "address": "0xc0e9fc5bcd8f467207c3b49221ff1d1b8ba620b0453735c6e79b79023e32d0e",
  "name": "product_registry",
  "friends": [],
  "exposed_functions": [
    {
      "name": "activate_product",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "0x1::string::String"
      ],
      "return": []
    },
    {
      "name": "get_manufacturer_products",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address"
      ],
      "return": [
        "vector<0x1::string::String>"
      ]
    },
    {
      "name": "get_product_by_nft",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address"
      ],
      "return": [
        "0xc0e9fc5bcd8f467207c3b49221ff1d1b8ba620b0453735c6e79b79023e32d0e::product_registry::ProductMetadata"
      ]
    },
    {
      "name": "get_product_metadata",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "0x1::string::String"
      ],
      "return": [
        "0xc0e9fc5bcd8f467207c3b49221ff1d1b8ba620b0453735c6e79b79023e32d0e::product_registry::ProductMetadata"
      ]
    },
    {
      "name": "get_product_status_name",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "u8"
      ],
      "return": [
        "0x1::string::String"
      ]
    },
    {
      "name": "get_total_products",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "u64"
      ]
    },
    {
      "name": "mint_product_nft",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "0x1::string::String",
        "0x1::string::String",
        "address"
      ],
      "return": []
    },
    {
      "name": "transfer_product_ownership",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "0x1::string::String",
        "address"
      ],
      "return": []
    },
    {
      "name": "update_product_status",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "0x1::string::String",
        "u8"
      ],
      "return": []
    },
    {
      "name": "verify_product_authenticity",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "0x1::string::String"
      ],
      "return": [
        "bool"
      ]
    }
  ],
  "structs": [
    {
      "name": "ProductActivated",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "product_id",
          "type": "0x1::string::String"
        },
        {
          "name": "nft_address",
          "type": "address"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "activation_timestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "ProductMetadata",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "copy",
        "drop",
        "store",
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "product_id",
          "type": "0x1::string::String"
        },
        {
          "name": "nft_address",
          "type": "address"
        },
        {
          "name": "manufacturer_address",
          "type": "address"
        },
        {
          "name": "batch_number",
          "type": "0x1::string::String"
        },
        {
          "name": "manufacture_timestamp",
          "type": "u64"
        },
        {
          "name": "status",
          "type": "u8"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "activation_timestamp",
          "type": "0x1::option::Option<u64>"
        }
      ]
    },
    {
      "name": "ProductMinted",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "product_id",
          "type": "0x1::string::String"
        },
        {
          "name": "nft_address",
          "type": "address"
        },
        {
          "name": "manufacturer_address",
          "type": "address"
        },
        {
          "name": "batch_number",
          "type": "0x1::string::String"
        },
        {
          "name": "manufacture_timestamp",
          "type": "u64"
        },
        {
          "name": "owner",
          "type": "address"
        }
      ]
    },
    {
      "name": "ProductRegistry",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "products",
          "type": "0x1::table::Table<0x1::string::String, 0xc0e9fc5bcd8f467207c3b49221ff1d1b8ba620b0453735c6e79b79023e32d0e::product_registry::ProductMetadata>"
        },
        {
          "name": "nft_to_product",
          "type": "0x1::table::Table<address, 0x1::string::String>"
        },
        {
          "name": "manufacturer_products",
          "type": "0x1::table::Table<address, vector<0x1::string::String>>"
        },
        {
          "name": "total_products",
          "type": "u64"
        }
      ]
    },
    {
      "name": "ProductStatusChanged",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "product_id",
          "type": "0x1::string::String"
        },
        {
          "name": "nft_address",
          "type": "address"
        },
        {
          "name": "old_status",
          "type": "u8"
        },
        {
          "name": "new_status",
          "type": "u8"
        },
        {
          "name": "timestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "ProductTransferred",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "product_id",
          "type": "0x1::string::String"
        },
        {
          "name": "nft_address",
          "type": "address"
        },
        {
          "name": "from_owner",
          "type": "address"
        },
        {
          "name": "to_owner",
          "type": "address"
        },
        {
          "name": "transfer_timestamp",
          "type": "u64"
        }
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
