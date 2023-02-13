const Telegram = require("./bots/telegram")
const { intro } = require("./message")
const Crypto_API = require("./service/alternative")

async function START() {
    intro()
    setInterval(async () => {
        try {
            const response = await Crypto_API.get_crypto_tickers()

            let date = new Date()
            let message =
                "━━ Ticker ━━━━━━━━━━━" + "\n" +
                "BTC: $" + response.BTC.quotes.USD.price + "\n" +
                "ETH: $" + response.ETH.quotes.USD.price + "\n" +
                "SOL: $" + response.SOL.quotes.USD.price + "\n" +
                "ATOM: $" + response.ATOM.quotes.USD.price + "\n" +
                "BNB: $" + response.BNB.quotes.USD.price + "\n" +
                "SAND: $" + response.SAND.quotes.USD.price + "\n" +
                "━━ Update ━━━━━━━━━━━" + "\n" +
                date.toUTCString() + "\n"

            await Telegram.update_message(message)
        } catch (error) {
            console.log(error)
        }
    }, 120000)
}

START()