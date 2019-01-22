const express = require('express')
const app = express()
const { bookmarksController } = require('./app/controllers/bookmarks_controller')
require('./config/db_config')
// app.use(express.json())
const port = 3001

app.get('/', (req, res) => {
	res.send('Welcome to the url-shortener backend')
})

app.use('/bookmarks', bookmarksController)

app.listen(port, () => console.log('Server started at port: ', port))