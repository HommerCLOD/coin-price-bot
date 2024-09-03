const axios = require("axios")

const { generate_message } = require("../service/utils")
const { CRYPTO_LIST } = require("../data/tracking-crypto")
const { CMC_API_KEY } = require("../config/config")

async function cmc_get_token_list() {
    try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD', {
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
        });
        const token_stat = response.data.data
        return token_stat
    } catch (error) {
        console.log(error)
    }
}

function filter_token_list(token_list, target_symbols) {
    const result = token_list.filter(token => target_symbols.has(token.name))
    return result
}

async function get_crypto_list() {
    try {
        const target_symbols = new Set(CRYPTO_LIST)
        const response = await cmc_get_token_list()
        const filtered_token_list = filter_token_list(response, target_symbols)
        const message = generate_message(filtered_token_list)

        return message
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get_crypto_list
}