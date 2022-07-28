# STEPS

`cd client && npm run demo`

# ERROR 1

https://explorer.devnet.aptos.dev/txn/6532012
`Transaction Executed and Committed with Error INVALID_MAIN_FUNCTION_SIGNATURE`

# ERROR 2

```
RequestError: Bad Request - {"code":400,"message":"invalid request body: invalid UserTransactionRequest: parse arguments[0] failed, expect string<move_struct_tag_id>, caused by error: Expecting a JSON Map for struct."} @ fullnode.devnet.aptoslabs.com/transactions/signing_message : {"sender":"0x46c152268b57c95020853da5b1479bf3daac34969923738352f10f96c060a09d","sequence_number":"0","max_gas_amount":"1000","gas_unit_price":"1","gas_currency_code":"XUS","expiration_timestamp_secs":"1659048457","payload":{"type":"script_function_payload","function":"0x5d18b8acd9e44e51eac61d00d3abf65f116f2028dfbd5197a4d8b8994f37a6ff::molyamain::init_config","type_arguments":[],"arguments":[["0x46c152268b57c95020853da5b1479bf3daac34969923738352f10f96c060a09d",{"test":"Hello!","data":{"data":"World!"}}]]}}
    at raiseForStatus (/home/moly/work/aptos/test/client/node_modules/aptos/dist/aptos_client.js:35:19)
    at AptosClient.<anonymous> (/home/moly/work/aptos/test/client/node_modules/aptos/dist/aptos_client.js:117:13)
    at Generator.next (<anonymous>)
    at fulfilled (/home/moly/work/aptos/test/client/node_modules/aptos/dist/aptos_client.js:5:58)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
```
