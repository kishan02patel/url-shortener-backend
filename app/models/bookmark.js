const mongoose = require('mongoose')
const validator = require('validator')
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

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {
	Bookmark
}