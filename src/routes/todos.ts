import { Router } from "express";
import { getTodos, addTodos, updateTodo, deleteTodo } from '../controllers/todos';

const todosRouter = Router();

todosRouter.route('/').get(getTodos);
todosRouter.route('/add').post(addTodos);
todosRouter.route('/:id').put(updateTodo);
todosRouter.route('/:id').delete(deleteTodo);

export { todosRouter }