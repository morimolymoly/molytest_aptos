module MolyTest::molyamain {
    use std::string;
    use std::signer;
    
    struct TestConfig has key, store, drop, copy {
        test: string::String,
        data: TestData,
    }

    struct TestData has key, store, drop, copy {
        data: string::String,
    }

    const  HELLO_WORLD: vector<u8> = vector<u8>[150, 145, 154, 154, 157, 040, 167, 157, 162, 154, 144];

    public entry fun init_config(acc: signer, config :TestConfig) {
        let account_addr = signer::address_of(&acc);
        if(!exists<TestConfig>(account_addr)) {
            move_to(&acc, config);
        };
    }

    public entry fun get_config_data(acc: signer) : vector<u8> acquires TestConfig {
        let account_addr = signer::address_of(&acc);
        if(!exists<TestConfig>(account_addr)) {
            let tc = borrow_global_mut<TestConfig>(account_addr);
            return *string::bytes(&tc.data.data)
        };
        return HELLO_WORLD
    }
}