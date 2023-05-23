const axios = require("axios")

const { ETHER_SCAN_APIKEY } = require("./../config/config")

async function get_gas_oracle() {
    try {
        const response = await axios.get("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + ETHER_SCAN_APIKEY)

        const result = response.data.result

        const message =
            `⚡${result.FastGasPrice} 🚶${result.ProposeGasPrice} 🐢${result.SafeGasPrice}
        ━━ GAS ━━━━━━━━━━━━━━\n
        ⚡${result.FastGasPrice} 🚶${result.ProposeGasPrice} 🐢${result.SafeGasPrice}
        Suggest Base Fee: ${result.suggestBaseFee}`

        return message
        console.log(response.data)
        console.log("⚡ 🚶 🐢")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get_gas_oracle
}