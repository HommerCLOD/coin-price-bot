const axios = require("axios")

const { BTC, ETH, SOL, ATOM, BNB, SAND, XRP, DOT, AVAX, TRX, CAKE, NEAR, WAX } = require("./../const/crypto_ticker_id")

async function get_crypto_tickers() {
    try {
        const response = await axios.get("https://api.alternative.me/v2/ticker/")

        const result = {
            BTC: response.data.data[BTC],
            ETH: response.data.data[ETH],
            SOL: response.data.data[SOL],
            ATOM: response.data.data[ATOM],
            BNB: response.data.data[BNB],
            SAND: response.data.data[SAND],
            XRP: response.data.data[XRP],
            DOT: response.data.data[DOT],
            AVAX: response.data.data[AVAX],
            TRX: response.data.data[TRX],
            CAKE: response.data.data[CAKE],
            NEAR: response.data.data[NEAR],
            WAX: response.data.data[WAX]
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

async function get_fear_and_greed_index() {
    try {
        const response = await axios.get("https://api.alternative.me/fng/")

        const result = {
            value: response.data.data[0].value,
            value_classification: response.data.data[0].value_classification
        }
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get_crypto_tickers,
    get_single_crypto_asset,
    get_fear_and_greed_index
}