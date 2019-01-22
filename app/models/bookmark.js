const mongoose = require('mongoose')
const validator = require('validator')
const shorthash = require('shorthash')
const { Schema } = mongoose

const bookmarkSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	originalURL: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				return validator.isURL(value)
			},
			message: function () {
				return 'URL is not valid'
			}
		}
	},
	tags: {
		type: [String],
		required: true
	},
	hashedURL: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

bookmarkSchema.pre('validate', (next) => {
	this.hashedURL = shorthash.unique(this.originalURL)
	next()
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {
	Bookmark
}