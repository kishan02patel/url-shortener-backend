const mongoose = require('mongoose')
const port = 27017

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost:${port}/url-shortener`, { useNewUrlParser: true })
	.then(() => console.log('Connected to DB'))
	.catch((err) => console.log(err))
