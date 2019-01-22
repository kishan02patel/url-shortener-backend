const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/bookmark')
router.use(express.json())

router.get('/', (req, res) => {
	Bookmark.find()
		.then((response) => {
			if (response.length > 0)
				res.send(response)
			else
				res.send('There is no bookmark present in Database.')
		})
		.catch((err) => res.send('There was some error in fetching bookmarks'))
})

router.post('/', (req, res) => {
	const newBookmark = new Bookmark(req.body)
	newBookmark.save()
		.then((response) => {
			res.send(response)
		})
		.catch((err) => res.send(err))
})

router.get('/:id', (req, res) => {
	Bookmark.findById(req.params.id)
		.then(response => {
			if (response)
				res.send(response)
			else
				res.send('No bookmark found with this id.')
		})
		.catch(err => res.send(err))
})

module.exports = {
	bookmarksController: router
}