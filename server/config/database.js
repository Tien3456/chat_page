const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
        .then(() => console.log('Connected to mongodb'))
        .catch(err => console.error(err))
}