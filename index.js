const express = require('express')
const app = express()
const { bookmarksController } = require('./app/controllers/bookmarks_controller')
const { Bookmark } = require('./app/models/bookmark')
const { getUserInfo } = require('./app/helpers/utility')
const morgan = require('morgan')
const fs = require('fs')
require('./config/db_config')
app.use(express.json())
const port = 3001

// Create a file stream to write to the log file.
var accessLogStream = fs.createWriteStream('./logs/access.log', { flags: 'a' })

// Logging each user request in specified format and passing the steam variable to write to the log.
app.use(morgan('{ methodName: \':method\', URL: \':url\', statusCode: \':status\', responseSize: \':res[content - length]\', responseTime: \':response-time ms\', date: \':date[iso]\', remoteAddress: \':remote-addr\', remoteUser: \':remote-user\' }', { stream: accessLogStream }))

app.get('/', (req, res) => {
	console.log('Homepage called /')
	res.send('Welcome to the url-shortener backend')
})

app.use('/bookmarks', bookmarksController)

app.get('/hash/:hash', (req, res) => {
	console.log('Hash page called /hash/:hash')
	Bookmark.findOne({ hashedURL: req.params.hash })
		.then(response => {
			if (response) {
				// res.send(response)
				res.redirect(response.originalURL)
				Bookmark.findByIdAndUpdate(response._id, { $push: { clicks: getUserInfo(req) } }, { new: true })
					.then(() => { })
					.catch(err => console.log('Error in updating the clicks array', err))
			}
			else
				res.send('No bookmark found with that hash')
		})
		.catch(err => res.send(err))
})

app.use(function (req, res) {
	console.log('Error 404: Page not found')
	res.status(404).send({ notice: 'The resource you are looking for doesn’t exist.' })
})

app.listen(port, () => console.log('Server started at port: ', port))