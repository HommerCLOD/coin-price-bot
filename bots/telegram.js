const TelegramBot = require("node-telegram-bot-api")
const axios = require("axios")

const { BOT_TOKEN, CHAT_ID } = require("../config/tg-config")

const bot = new TelegramBot(BOT_TOKEN, { polling: true })

async function bot_launch() {
    bot.on("polling_error", (error) => { console.log(error) })
}

async function send_message(chat_id, content) {
    try {
        const config = {
            chat_id: chat_id,
            text: content
        }

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

        await axios.post(url, config)
    } catch (error) {
        console.log(error)
    }
}

async function update_message(text, message_id) {
    try {
        const response = await bot.editMessageText(`${text}`, { chat_id: CHAT_ID, message_id })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    bot_launch,
    send_message,
    update_message
}