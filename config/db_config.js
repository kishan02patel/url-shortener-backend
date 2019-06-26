const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/url-shortener'

mongoose.Promise = global.Promise
mongoose.connect(DB_URL, { useNewUrlParser: true })
	.then(() => console.log('Connected to DB'))
	.catch((err) => console.log(err))
