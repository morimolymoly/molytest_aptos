import { AptosClient, AptosAccount, FaucetClient, Types } from "aptos";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

class TestConfig {
    test: string
    data: TestData
}

class TestData {
    data: string
}

class TestUtil {
    // generate txn payload for any script function
    static getScriptFunctionTxnPayload(funcName: string, args: Types.MoveValue[] | null): Types.TransactionPayload {
        const payload = {
            type: "script_function_payload",
            function: `${funcName}`,
            type_arguments: [],
            arguments: [
                args
            ],
        };
        return payload;
    }

    static getScriptFunction(funcName: string): Types.TransactionPayload {
        const payload = {
            type: "script_function_payload",
            function: `${funcName}`,
            type_arguments: [],
            arguments: []
        };
        return payload;
    }

    // exec a transaction
    static async executeTransaction(
        client: AptosClient,
        account: AptosAccount,
        payload: Types.TransactionPayload,
    ): Promise<Types.HexEncodedBytes> {
        let txnRequest = await client.generateTransaction(account.address(), payload);
        let signedTxn = await client.signTransaction(account, txnRequest);
        let transactionRes = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(transactionRes.hash);
        return transactionRes.hash;
    }
}

class TestClient {
    client: AptosClient;

    constructor(client: AptosClient) {
        this.client = client;
    }

    async initConfig(account: AptosAccount) {
        // https://explorer.devnet.aptos.dev/account/0x5d18b8acd9e44e51eac61d00d3abf65f116f2028dfbd5197a4d8b8994f37a6ff
        let fname = "0x5d18b8acd9e44e51eac61d00d3abf65f116f2028dfbd5197a4d8b8994f37a6ff::molyamain::init_config";

        let tc = new TestConfig();
        tc.test = "Hello!";
        let td = new TestData();
        td.data = "World!"
        tc.data = td;

        let args = [account.address().toString(), tc];
        const initPayload = TestUtil.getScriptFunctionTxnPayload(fname, args);
        await TestUtil.executeTransaction(this.client, account, initPayload);
    }

    async getData(account: AptosAccount) {
        // https://explorer.devnet.aptos.dev/account/0x5d18b8acd9e44e51eac61d00d3abf65f116f2028dfbd5197a4d8b8994f37a6ff
        let fname = "0x5d18b8acd9e44e51eac61d00d3abf65f116f2028dfbd5197a4d8b8994f37a6ff::molyamain::get_config_data";

        const initPayload = TestUtil.getScriptFunction(fname);
        const res = await TestUtil.executeTransaction(this.client, account, initPayload);
        console.log(res);
    }
}

(async () => {
    const client = new AptosClient(NODE_URL);
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL, undefined);
    let alice = new AptosAccount();
    await faucetClient.fundAccount(alice.address(), 5000);

    console.log(alice.address().toString());

    let tc = new TestClient(client);
    try {
        await tc.initConfig(alice);
    } catch (e) {
        console.log(e);
    }
    
    await tc.getData(alice);
})();