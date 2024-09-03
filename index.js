const Telegram = require("./bots/telegram")
const { intro } = require("./message")
const Crypto_API = require("./service/alternative")
const { get_gas_oracle } = require("./service/etherscan")
const { get_crypto_list } = require("./service/coinmarketcap")

async function START() {
    intro()

    await update_prices()
    await update_gas()
}

async function update_prices() {
    setInterval(async () => {
        try {
            console.log(new Date(), "Try to update")

            const fear_and_greed = await Crypto_API.get_fear_and_greed_index()

            let date = new Date()
            let message = await get_crypto_list()

            message += "━━ Fear and Greed ━━━━━━━" + "\n" +
                fear_and_greed.value_classification + ": " + fear_and_greed.value + "\n" +
                "━━ Update ━━━━━━━━━━" + "\n" +
                date.toUTCString() + "\n"

            await Telegram.update_message(message, 3)
        } catch (error) {
            console.log(error)
        }
    }, 120000)
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