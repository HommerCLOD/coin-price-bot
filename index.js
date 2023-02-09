const Telegram = require("./bots/telegram")
const Crypto_API = require("./service/alternative")

async function START() {

    setInterval(async () => {
        try {
            const response = await Crypto_API.get_crypto_tickers()

            let date = new Date()
            let message =
                "BTC: $" + response.BTC.quotes.USD.price + "\n" +
                "ETH: $" + response.ETH.quotes.USD.price + "\n" +
                "SOL: $" + response.SOL.quotes.USD.price + "\n" +
                "Update: " + date.toUTCString() + "\n"

            await Telegram.update_message(message)
        } catch (error) {
            console.log(error)
        }
    }, 120000)
}

START()