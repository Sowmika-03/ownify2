module product_registry_addr::product_registry {
    use std::string::{Self, String};
    use std::signer;
    use std::option::{Self, Option};
    use std::vector;
    use aptos_std::table::{Self, Table};
    use aptos_framework::object::{Self};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_token_objects::token;
    use aptos_token_objects::collection;
    use aptos_std::string_utils;

    // Error codes
    /// Caller is not authorized to perform this action
    const E_NOT_AUTHORIZED: u64 = 1;
    /// Product with given ID was not found
    const E_PRODUCT_NOT_FOUND: u64 = 2;
    /// Invalid status transition attempted
    const E_INVALID_STATUS_TRANSITION: u64 = 3;
    /// Product is already activated
    const E_ALREADY_ACTIVATED: u64 = 4;
    /// Caller is not the owner of the product
    const E_NOT_OWNER: u64 = 5;
    /// Product already exists with this ID
    const E_PRODUCT_ALREADY_EXISTS: u64 = 6;

    // Product status constants
    const STATUS_MINTED: u8 = 1;
    const STATUS_ACTIVE: u8 = 2;
    const STATUS_LOCKED_SERVICE: u8 = 3;
    const STATUS_RETIRED: u8 = 4;

    // Collection and token configuration
    const COLLECTION_NAME: vector<u8> = b"Product Registry NFTs";
    const COLLECTION_DESCRIPTION: vector<u8> = b"NFTs representing proof of product ownership";

    // Product metadata structure
    struct ProductMetadata has key, store, copy, drop {
        product_id: String,
        nft_address: address,
        manufacturer_address: address,
        batch_number: String,
        manufacture_timestamp: u64,
        status: u8,
        owner: address,
        activation_timestamp: Option<u64>,
    }

    // Registry to store all products
    struct ProductRegistry has key {
        products: Table<String, ProductMetadata>, // product_id -> ProductMetadata
        nft_to_product: Table<address, String>, // nft_address -> product_id
        manufacturer_products: Table<address, vector<String>>, // manufacturer -> product_ids
        total_products: u64,
    }

    // Events
    #[event]
    struct ProductMinted has drop, store {
        product_id: String,
        nft_address: address,
        manufacturer_address: address,
        batch_number: String,
        manufacture_timestamp: u64,
        owner: address,
    }

    #[event]
    struct ProductActivated has drop, store {
        product_id: String,
        nft_address: address,
        owner: address,
        activation_timestamp: u64,
    }

    #[event]
    struct ProductTransferred has drop, store {
        product_id: String,
        nft_address: address,
        from_owner: address,
        to_owner: address,
        transfer_timestamp: u64,
    }

    #[event]
    struct ProductStatusChanged has drop, store {
        product_id: String,
        nft_address: address,
        old_status: u8,
        new_status: u8,
        timestamp: u64,
    }

    // Initialize the module (called once when module is first published)
    fun init_module(admin: &signer) {
        // Create the collection for product NFTs
        let _collection_constructor_ref = collection::create_unlimited_collection(
            admin,
            string::utf8(COLLECTION_DESCRIPTION),
            string::utf8(COLLECTION_NAME),
            option::none(),
            string::utf8(b"https://example.com"),
        );

        // Initialize the product registry
        move_to(admin, ProductRegistry {
            products: table::new(),
            nft_to_product: table::new(),
            manufacturer_products: table::new(),
            total_products: 0,
        });
    }

    // Mint a new product NFT
    public entry fun mint_product_nft(
        manufacturer: &signer,
        product_id: String,
        batch_number: String,
        to_address: address,
    ) acquires ProductRegistry {
        let manufacturer_addr = signer::address_of(manufacturer);
        let registry = borrow_global_mut<ProductRegistry>(@product_registry_addr);
        
        // Ensure product doesn't already exist
        assert!(!table::contains(&registry.products, product_id), E_PRODUCT_ALREADY_EXISTS);

        // Create the NFT token
        let token_constructor_ref = token::create_named_token(
            manufacturer,
            string::utf8(COLLECTION_NAME),
            string::utf8(b"Product Authentication NFT"),
            string_utils::format1(&b"Product ID: {}", product_id),
            option::none(),
            string::utf8(b"https://example.com/token"),
        );

        let nft_address = object::address_from_constructor_ref(&token_constructor_ref);
        let current_time = timestamp::now_seconds();

        // Create product metadata
        let product_metadata = ProductMetadata {
            product_id,
            nft_address,
            manufacturer_address: manufacturer_addr,
            batch_number,
            manufacture_timestamp: current_time,
            status: STATUS_MINTED,
            owner: to_address,
            activation_timestamp: option::none(),
        };

        // Store in registry
        table::add(&mut registry.products, product_id, product_metadata);
        table::add(&mut registry.nft_to_product, nft_address, product_id);
        
        // Update manufacturer's product list
        if (!table::contains(&registry.manufacturer_products, manufacturer_addr)) {
            table::add(&mut registry.manufacturer_products, manufacturer_addr, vector::empty<String>());
        };
        let manufacturer_list = table::borrow_mut(&mut registry.manufacturer_products, manufacturer_addr);
        vector::push_back(manufacturer_list, product_id);

        registry.total_products = registry.total_products + 1;

        // Transfer the NFT to the specified address
        let transfer_ref = object::generate_transfer_ref(&token_constructor_ref);
        object::transfer_with_ref(object::generate_linear_transfer_ref(&transfer_ref), to_address);

        // Emit event
        event::emit(ProductMinted {
            product_id,
            nft_address,
            manufacturer_address: manufacturer_addr,
            batch_number,
            manufacture_timestamp: current_time,
            owner: to_address,
        });
    }

    // Activate a product NFT (buyer action)
    public entry fun activate_product(
        owner: &signer,
        product_id: String,
    ) acquires ProductRegistry {
        let owner_addr = signer::address_of(owner);
        let registry = borrow_global_mut<ProductRegistry>(@product_registry_addr);
        
        // Ensure product exists
        assert!(table::contains(&registry.products, product_id), E_PRODUCT_NOT_FOUND);
        
        let product_metadata = table::borrow_mut(&mut registry.products, product_id);
        
        // Ensure caller is the owner
        assert!(product_metadata.owner == owner_addr, E_NOT_OWNER);
        
        // Ensure product is in minted status
        assert!(product_metadata.status == STATUS_MINTED, E_ALREADY_ACTIVATED);

        let current_time = timestamp::now_seconds();
        let old_status = product_metadata.status;
        
        // Update status and activation timestamp
        product_metadata.status = STATUS_ACTIVE;
        product_metadata.activation_timestamp = option::some(current_time);

        // Emit events
        event::emit(ProductActivated {
            product_id,
            nft_address: product_metadata.nft_address,
            owner: owner_addr,
            activation_timestamp: current_time,
        });

        event::emit(ProductStatusChanged {
            product_id,
            nft_address: product_metadata.nft_address,
            old_status,
            new_status: STATUS_ACTIVE,
            timestamp: current_time,
        });
    }

    // Transfer NFT ownership (also updates product ownership)
    public entry fun transfer_product_ownership(
        current_owner: &signer,
        product_id: String,
        new_owner: address,
    ) acquires ProductRegistry {
        let current_owner_addr = signer::address_of(current_owner);
        let registry = borrow_global_mut<ProductRegistry>(@product_registry_addr);
        
        // Ensure product exists
        assert!(table::contains(&registry.products, product_id), E_PRODUCT_NOT_FOUND);
        
        let product_metadata = table::borrow_mut(&mut registry.products, product_id);
        
        // Ensure caller is the current owner
        assert!(product_metadata.owner == current_owner_addr, E_NOT_OWNER);

        let current_time = timestamp::now_seconds();
        let old_owner = product_metadata.owner;
        
        // Update ownership
        product_metadata.owner = new_owner;

        // Note: In a real implementation, you'd also need to transfer the actual NFT object
        // This would require additional object framework functions

        // Emit event
        event::emit(ProductTransferred {
            product_id,
            nft_address: product_metadata.nft_address,
            from_owner: old_owner,
            to_owner: new_owner,
            transfer_timestamp: current_time,
        });
    }

    // Update product status (manufacturer or owner action)
    public entry fun update_product_status(
        caller: &signer,
        product_id: String,
        new_status: u8,
    ) acquires ProductRegistry {
        let caller_addr = signer::address_of(caller);
        let registry = borrow_global_mut<ProductRegistry>(@product_registry_addr);
        
        // Ensure product exists
        assert!(table::contains(&registry.products, product_id), E_PRODUCT_NOT_FOUND);
        
        let product_metadata = table::borrow_mut(&mut registry.products, product_id);
        
        // Ensure caller is authorized (manufacturer or owner)
        assert!(
            product_metadata.manufacturer_address == caller_addr || 
            product_metadata.owner == caller_addr, 
            E_NOT_AUTHORIZED
        );

        // Validate status transition
        assert!(
            new_status >= STATUS_MINTED && new_status <= STATUS_RETIRED,
            E_INVALID_STATUS_TRANSITION
        );

        let old_status = product_metadata.status;
        let current_time = timestamp::now_seconds();
        
        // Update status
        product_metadata.status = new_status;

        // Emit event
        event::emit(ProductStatusChanged {
            product_id,
            nft_address: product_metadata.nft_address,
            old_status,
            new_status,
            timestamp: current_time,
        });
    }

    // View functions

    #[view]
    public fun get_product_metadata(product_id: String): ProductMetadata acquires ProductRegistry {
        let registry = borrow_global<ProductRegistry>(@product_registry_addr);
        assert!(table::contains(&registry.products, product_id), E_PRODUCT_NOT_FOUND);
        *table::borrow(&registry.products, product_id)
    }

    #[view]
    public fun get_product_by_nft(nft_address: address): ProductMetadata acquires ProductRegistry {
        let registry = borrow_global<ProductRegistry>(@product_registry_addr);
        assert!(table::contains(&registry.nft_to_product, nft_address), E_PRODUCT_NOT_FOUND);
        let product_id = *table::borrow(&registry.nft_to_product, nft_address);
        *table::borrow(&registry.products, product_id)
    }

    #[view]
    public fun get_manufacturer_products(manufacturer_addr: address): vector<String> acquires ProductRegistry {
        let registry = borrow_global<ProductRegistry>(@product_registry_addr);
        if (table::contains(&registry.manufacturer_products, manufacturer_addr)) {
            *table::borrow(&registry.manufacturer_products, manufacturer_addr)
        } else {
            vector::empty<String>()
        }
    }

    #[view]
    public fun get_total_products(): u64 acquires ProductRegistry {
        let registry = borrow_global<ProductRegistry>(@product_registry_addr);
        registry.total_products
    }

    #[view]
    public fun verify_product_authenticity(product_id: String): bool acquires ProductRegistry {
        let registry = borrow_global<ProductRegistry>(@product_registry_addr);
        table::contains(&registry.products, product_id)
    }

    #[view]
    public fun get_product_status_name(status: u8): String {
        if (status == STATUS_MINTED) {
            string::utf8(b"Minted")
        } else if (status == STATUS_ACTIVE) {
            string::utf8(b"Active")
        } else if (status == STATUS_LOCKED_SERVICE) {
            string::utf8(b"Locked/Service")
        } else if (status == STATUS_RETIRED) {
            string::utf8(b"Retired")
        } else {
            string::utf8(b"Unknown")
        }
    }
}
