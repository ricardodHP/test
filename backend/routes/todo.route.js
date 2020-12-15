module.exports = app => {
    const router = require('express').Router();
    const controllerTodo = require('../controllers/todo.controller');

    router.get('/todos', controllerTodo.findAllTodos);
    router.get('/todos/:id', controllerTodo.getTodoDetails);
    router.post('/todos', controllerTodo.createTodo);
    router.put('/todos/:id', controllerTodo.updateTodo);
    router.patch('/todos/:id', controllerTodo.updateTodoStatus);
    router.delete('/todos/:id', controllerTodo.deleteTodo);

    app.use('/api', router);
}
