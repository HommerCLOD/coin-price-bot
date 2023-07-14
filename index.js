const Telegram = require("./bots/telegram")
const { intro } = require("./message")
const Crypto_API = require("./service/alternative")
const { get_gas_oracle } = require("./service/etherscan")

async function START() {
    intro()

    setInterval(async () => {
        try {
            const response = await Crypto_API.get_crypto_tickers()

            const fear_and_greed = await Crypto_API.get_fear_and_greed_index()

            let date = new Date()
            let message =
                "━━ Ticker ━━━━━━━━━━━" + "\n" +
                "BTC: $" + response.BTC.quotes.USD.price + "\n" +
                "ETH: $" + response.ETH.quotes.USD.price + "\n" +
                "SOL: $" + response.SOL.quotes.USD.price + "\n" +
                "ATOM: $" + response.ATOM.quotes.USD.price + "\n" +
                "BNB: $" + response.BNB.quotes.USD.price + "\n" +
                "SAND: $" + response.SAND.quotes.USD.price + "\n" +
                "XRP: $" + response.XRP.quotes.USD.price + "\n" +
                "DOT: $" + response.DOT.quotes.USD.price + "\n" +
                "AVAX: $" + response.AVAX.quotes.USD.price + "\n" +
                "TRX: $" + response.TRX.quotes.USD.price + "\n" +
                "CAKE: $" + response.CAKE.quotes.USD.price + "\n" +
                "NEAR: $" + response.NEAR.quotes.USD.price + "\n" +
                "WAX: $" + response.WAX.quotes.USD.price + "\n" +
                "━━ Fear and Greed ━━━━━━━" + "\n" +
                fear_and_greed.value_classification + ": " + fear_and_greed.value + "\n" +
                "━━ Update ━━━━━━━━━━" + "\n" +
                date.toUTCString() + "\n"

            await Telegram.update_message(message, 3)
        } catch (error) {
            console.log(error)
        }
    }, 120000)

    await update_gas()
}

async function update_gas() {
    setInterval(async () => {
        try {
            const message = await get_gas_oracle()

            await Telegram.update_message(message, 9)
        } catch (error) {
            console.log(error)
        }
    }, 10000)
}

START()