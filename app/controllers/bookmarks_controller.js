const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/bookmark')
const shorthash = require('shorthash')
router.use(express.json())

router.get('/', (req, res) => {
	console.log('Bookmarks GET page called /bookmarks')
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
	console.log('Bookmarks POST page called /bookmarks')
	const newBookmark = new Bookmark(req.body)
	newBookmark.save()
		.then((response) => {
			res.send(response)
		})
		.catch((err) => res.send(err))
})

router.get('/tags', (req, res) => {
	console.log('GET bookmarks by tags page called /bookmarks/tags')
	Bookmark.find({ tags: { "$in": req.query.names.split(',') } })
		.then(response => {
			if (response.length > 0)
				res.send(response)
			else
				res.send('No bookmark found with specified tags.')
		})
		.catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
	console.log('GET bookmark by id page called /bookmarks/:id')
	Bookmark.findById(req.params.id)
		.then(response => {
			if (response)
				res.send(response)
			else
				res.send('No bookmark found with this id.')
		})
		.catch(err => res.send(err))
})

router.patch('/:id', (req, res) => {
	console.log('PATCH bookmark page called /:id')
	if (req.body.originalURL)
		req.body.hashedURL = shorthash.unique(req.body.originalURL)
	Bookmark.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
		.then(response => res.send(response))
		.catch(err => res.send(err))
})

router.delete('/:id', (req, res) => {
	console.log('DELETE bookmark page called /bookmarks/:id')
	Bookmark.findByIdAndRemove(req.params.id)
		.then(response => res.send(response))
		.catch(err => res.send(err))
})

router.get('/tags/:name', (req, res) => {
	console.log('GET bookmarks by tag page called /bookmarks/tags/:name')
	Bookmark.find({ tags: req.params.name })
		.then(response => {
			if (response.length > 0)
				res.send(response)
			else
				res.send('No bookmark found with specified tag.')
		})
		.catch(err => res.send(err))
})

module.exports = {
	bookmarksController: router
}