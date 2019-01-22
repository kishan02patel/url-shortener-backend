const express = require('express')
const app = express()
const { bookmarksController } = require('./app/controllers/bookmarks_controller')
const { Bookmark } = require('./app/models/bookmark')
const { getUserInfo } = require('./app/helpers/utility')
require('./config/db_config')
app.use(express.json())
const port = 3001

app.get('/', (req, res) => {
	res.send('Welcome to the url-shortener backend')
})

app.use('/bookmarks', bookmarksController)

app.get('/hash/:hash', (req, res) => {
	Bookmark.findOne({ hashedURL: req.params.hash })
		.then(response => {
			if (response) {
				res.send(response)
				Bookmark.findByIdAndUpdate(response._id, { $push: { clicks: getUserInfo(req) } }, { new: true })
					.then(() => { })
					.catch(err => console.log('Error in updating the clicks array', err))
			}
			else
				res.send('No bookmark found with that hash')
		})
		.catch(err => res.send(err))
})

app.listen(port, () => console.log('Server started at port: ', port))