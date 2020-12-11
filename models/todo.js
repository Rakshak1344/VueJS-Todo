const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    is_completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('todo', taskSchema)

module.exports = Todo