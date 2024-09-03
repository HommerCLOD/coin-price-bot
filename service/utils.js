function generate_message(data) {
    let message = "━━ Ticker ━━━━━━━━━ 1d | 7d % change" + "\n"
    try {

        for (let item of data) {

            const emoji_24h = item.quote.USD.percent_change_24h >= 0 ? "🟢" : "🔴";
            const emoji_7d = item.quote.USD.percent_change_7d >= 0 ? "🟢" : "🔴";

            message += `${item.symbol}: $${item.quote.USD.price.toFixed(5)} | ${item.quote.USD.percent_change_24h.toFixed(1)}% ${emoji_24h} | ${item.quote.USD.percent_change_7d.toFixed(1)}% ${emoji_7d}\n`
        }

        return message
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    generate_message
}