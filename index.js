require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Require Routes
const todoRoute = require('./Routes/todo')


// Confiuring Mongodb database
require('./mongoose')



const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/v1', todoRoute)


const port = process.env.PORT || 3000
// listening to server
app.listen(port, (err) => {
    console.log(chalk.green.bgWhite.inverse(`connected on port ${port}`))
    if (err) {
        console.log(chalk.green.bgWhite.inverse("Some thing went wrong"))
    }
})