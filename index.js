// const TelegramBot 	= require('node-telegram-bot-api')
const Telegraf 				= require('telegraf')
const { Router, Markup } 	= Telegraf
const PORT					= process.env.PORT || 5000
const token					= '529343186:AAEGqz0kDM-AWrDUnGWOgXcw8w88e7Kf-DY'
const client				= require('mongodb').MongoClient
const mongodbUri			= process.env.MONGODB_URI
const dbName				= 'heroku_1w0b9d08'


// var bot 			= new TelegramBot(token, {polling: true})
const bot 			= new Telegraf(token, {username: 'master_mind_game_bot'})
const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton('👍', 'like'),
    Markup.callbackButton('👎', 'dislike')
]).extra()

client.connect(mongodbUri, { useNewUrlParser: true }, function(err, client) {
	if(err) throw err;
  	let db 			= client.db(dbName)
 	db.createCollection("games", function(err, res) {
    	if (err) throw err;
    	console.log("Collection created!");
    	client.close();
  	})
	console.log('Connected')
})

bot.telegram.setWebhook('https://mastermindgamebot.herokuapp.com/bot' + token)
bot.startWebhook('/bot' + token, null, PORT)

bot.command('hello', (ctx) => {
	var firstName 	= ctx.message.from.first_name
	var lastName 	= ctx.message.from.last_name

	console.log(ctx.message)

	if (firstName != '' && typeof firstName !== 'undefined'
		&& lastName != '' && typeof lastName !== 'undefined') {
			return ctx.reply('Hello ' + firstName + lastName)
	} else if (firstName != '' && typeof firstName !== 'undefined') {
		return ctx.reply('Hello ' + firstName)
	} else if (lastName != '' && typeof lastName !== 'undefined') {
		return ctx.reply('Hello ' + lastName)
	} else {
		return ctx.reply('Hello')
	}
})

bot.command('pm', (ctx) => {
	ctx.telegram.sendMessage(ctx.message.from.id, 'hello, this is pm message')
	return
})

bot.command('eatWhat', (ctx) => {
	ctx.telegram.sendMessage(ctx.message.chat.id, 'KFC', inlineMessageRatingKeyboard)
	return
})

bot.action('like', (ctx) => {
	ctx.editMessageText('KFC')
	ctx.reply('🎉 Awesome! 🎉')
	return
})
bot.action('dislike', (ctx) => {
	ctx.editMessageText('KFC')
	ctx.reply('okey')
	return
})

bot.command('newGame', (ctx) => {
	client.connect(mongodbUri, { useNewUrlParser: true }, function(err, client) {

  		if (err) throw err;
  		let dbo = client.db(dbName);
  		dbo.collection('games')
  			.find({id:ctx.message.chat.id, status:'A'})
  			.toArray(function(err, result) {
    			if (err) throw err;
    			console.log(result.length);
    			if (result.length > 0) {
    				ctx.reply('Game Already Started')
    				db.close();
    			} else {
    				dbo.collection('games').insertOne({id:ctx.message.chat.id, status:'A'}, function(err, res) {
    					if (err) throw err;
    					console.log('1 document inserted');
    					db.close();
  					});
    			}
  		});
  	})
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