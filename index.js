// const TelegramBot 	= require('node-telegram-bot-api')
const Telegraf 		= require('telegraf')
const PORT			= process.env.PORT || 5000
const token			= '529343186:AAEGqz0kDM-AWrDUnGWOgXcw8w88e7Kf-DY'


// var bot 			= new TelegramBot(token, {polling: true})
const bot 			= new Telegraf(token)


bot.telegram.setWebhook('https://mastermindgamebot.herokuapp.com:8443/bot' + token, {})
bot.startWebhook('/bot' + token, tlsOptions, 8443)
bot.startWebhook('/bot' + token, null, 5000)

bot.on('text', (ctx) => {
  return ctx.reply('Hello ' + `${ctx.message.from.username}`)
})
// bot.onText(/\/start/, function(msg) {
// 	var chatId	= msg.chat.id
// 	var resp	= 'Hello'
// 	bot.sendMessage(chatId, resp)
// })

// bot.onText(/\/cal (.+)/, function(msg, match) {
// 	var fromId	= msg.from.id
// 	var resp	= match[1].replace(/[^-()\d/*+.]/g, '')
// 	resp		= 'Result: ' + eval(resp)
// 	bot.sendMessage(fromId, resp)
// })

// bot.onText(/\/new/, function(msg, match) {
// 	var fromId = msg.from.id
// 	bot.sendMessage(fromId, "New?!")
	// bot.sendGame(
	// 	fromId,
	// 	"New Game",
	// 	{
	// 		reply_markup: JSON.stringify({
	// 			inline_keyboard: [
	// 				[{	text: "Play",
	// 					callback_game: JSON.stringify({game_short_name: "New Game"})
	// 				}]
	// 			]
	// 		})
	// 	}
	// )
// })

// bot.on("callback_query", function(cq) {
// 	if (cq.game_short_name) {
// 		bot.answerCallbackQuery(cq.id, undefined, false, {url: "URL_DE_NUESTO_JUEGO"})
// 	}
// })

// bot.on("inline_query", function(iq) {
// 	bot.answerInlineQuery(iq.id, [{type: "game", id: "0", game_short_name: "Master Mind"}])
// })