import expressAsyncHandler from "express-async-handler";

export const getTodos = expressAsyncHandler(async (req: any, res: any) => {
    const todos = await (await req.pool).query('SELECT * FROM items ORDER BY id ASC');
    res.json(todos.rows);
})

export const addTodos = expressAsyncHandler(async (req: any, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('Please add a title');
    }
    const todo = await (await req.pool).query('INSERT INTO items (title) VALUES ($1) ', [title]);
    res.status(201).json({
        message: 'Todo added successfully',
        todo: todo.rows[0]
    });
});

export const updateTodo = expressAsyncHandler(async (req: any, res) => {
    const { title } = req.body;
    const { id } = req.params;
    if (!title) {
        res.status(400);
        throw new Error('Please add a title');
    }
    const todo = await (await req.pool).query('UPDATE items SET title = $1 WHERE id = $2', [title, id]);
    res.status(200).json({
        message: 'Todo updated successfully',
        todo: todo.rows[0]
    });
});

export const deleteTodo = expressAsyncHandler(async (req: any, res) => {
    const { id } = req.params;
    const todo = await (await req.pool).query('DELETE FROM items WHERE id = $1', [id]);
    res.status(200).json({
        message: 'Todo deleted successfully',
        todo: todo.rows[0]
    });
})

