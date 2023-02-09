const axios = require("axios")

const { BTC, ETH, SOL } = require("./../const/crypto_ticker_id")

async function get_crypto_tickers() {
    try {
        const response = await axios.get("https://api.alternative.me/v2/ticker/")

        const result = {
            BTC: response.data.data[BTC],
            ETH: response.data.data[ETH],
            SOL: response.data.data[SOL]
        }
        
        return result
    } catch (error) {
        console.log(error)
    }
}

async function get_single_crypto_asset(ticker) {
    try {
        const response = await axios.get(`https://api.alternative.me/v2/ticker/${ticker}/`)

        const key = Object.keys(response.data.data)

        return response.data.data[key[0]]
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get_crypto_tickers,
    get_single_crypto_asset
}