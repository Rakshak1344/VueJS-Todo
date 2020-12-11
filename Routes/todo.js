const { Router } = require('express')
const todoController = require('../controller/todo')
const router = Router()

router.get('/', todoController.getTodo)
router.post('/', todoController.createTodo)
router.delete('/:id', todoController.deleteTodo)
router.put('/:id', todoController.updateTodo)

module.exports = router