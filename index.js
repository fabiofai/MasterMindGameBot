const TelegramBot 	= require('node-telegram-bot-api')
const PORT			= process.env.PORT || 5000
const token			= '529343186:AAEGqz0kDM-AWrDUnGWOgXcw8w88e7Kf-DY'

var bot 			= new TelegramBot(token, {polling: true})

bot.onText(/\/start/, function(msg) {
	var chatId	= msg.chat.id
	var resp	= 'Hello'
	bot.sendMessage(chatId, resp)
})

bot.onText(/\/cal (.+)/, function (msg, match) {
	var fromId	= msg.from.id
	var resp	= match[1].replace(/[^-()\d/*+.]/g, '')
	resp		= 'Result: ' + eval(resp)
	bot.sendMessage(fromId, resp)
})