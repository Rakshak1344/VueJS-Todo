const fs = require('fs')
const Todo = require('../models/todo')

module.exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.find({})
        if (!todo)
            throw new Error("No Todo find")
        res.status(200).json(todo)
    } catch (e) {
        res.status(400).json({ "message": e.message })
    }
}

module.exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body)
        if (!todo)
            throw new Error("Something went wrong!")
        res.status(200).json(todo)
    } catch (e) {
        if (e.code == 11000)
            res.status(400).json({ "message": "Todo already exists!" })
        res.status(400).json({ "message": e.message })
    }
}

module.exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if (!todo)
            throw new Error("No Todo found!")
        res.status(200).json({ todo, "message": true })
    } catch (e) {
        res.status(400).json({ "message": e.message })
    }
}



module.exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!todo)
            throw new Error("No Todo found!")
        res.status(200).json(todo)
    } catch (e) {
        return (e.code === 11000) ?
            res.status(400).json({ "message": "cannot have same todo" }) :
            res.status(400).json({ "message": e.message })
    }
}