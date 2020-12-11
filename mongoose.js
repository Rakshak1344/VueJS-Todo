const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    try {
        console.log(chalk.green.bgWhite.inverse("connceted to DB"))
    } catch (e) {
        console.log(chalk.red.bgWhite.inverse("Some thing went wrong"))
    }
})