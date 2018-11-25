const express = require('express')
const PORT = process.env.PORT || 5000
var app = express()
/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/
app.get('/notes', function(req, res) {
	res.json({notes: "This is your notebook"})
})

app.get('/test', function(req, res) {
	res.json({test: "This is test"})
})

app.listen(PORT)
