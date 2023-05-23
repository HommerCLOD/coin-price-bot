const axios = require("axios")

const { ETHER_SCAN_APIKEY } = require("./../config/config")

async function get_gas_oracle() {
    try {
        const response = await axios.get("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + ETHER_SCAN_APIKEY)

        const result = response.data.result
        const date = new Date()
        const message =
            `⚡${result.FastGasPrice} 🚶${result.ProposeGasPrice} 🐢${result.SafeGasPrice}` + "\n" +
            "━━ GAS ━━━━━━━━━━━━" + "\n" +
            `⚡${result.FastGasPrice} 🚶${result.ProposeGasPrice} 🐢${result.SafeGasPrice}` + "\n" +
            `Suggest Base Fee: ${result.suggestBaseFee}` + "\n" +
            "━━ Update ━━━━━━━━━━" + "\n" +
            `${date.toUTCString()}` + "\n"
        return message
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get_gas_oracle
}