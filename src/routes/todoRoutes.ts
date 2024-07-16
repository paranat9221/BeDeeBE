import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

interface Todo {
    id: string;
    title: string;
    createdDate: Date;
    status: 'pending' | 'in-progress' | 'done';
}

let todoList: Todo[] = [];

router.post('/todo', (req: Request, res: Response) => {
    const { title }: { title: string } = req.body;

    if (typeof title !== 'string') {
        return res.status(400).send('Invalid todo format');
    }

    const newTodo: Todo = {
        id: uuidv4(),
        title,
        createdDate: new Date(),
        status: 'pending',
    };

    todoList.push(newTodo);
    res.status(200).send('done');
});

router.get('/todo', (req: Request, res: Response) => {
    res.send(todoList);
});

router.get('/todo/:id', (req: Request, res: Response) => {
    const todo = todoList.find(u => u.id === req.params.id);
    if (!todo) return res.status(404).send('Not found');
    res.send(todo);
});

router.patch('/todo/:id/in-progress', (req: Request, res: Response) => {
    const { id } = req.params;

    const todo = todoList.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).send('not found');
    }

    todo.status = 'in-progress';
    res.status(200).send('Status updated to In progress');
});

router.patch('/todo/:id/done', (req: Request, res: Response) => {
    const { id } = req.params;

    const todo = todoList.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).send('not found');
    }

    todo.status = 'done';
    res.status(200).send('Status updated to Done');
});


router.put('/todo/:id', (req: Request, res: Response) => {
    const todo = todoList.find(u => u.id === req.params.id);
    if (!todo) return res.status(404).send('Not found');

    todo.title = req.body.name;
    res.send(todo);
});

router.delete('/todo/:id', (req: Request, res: Response) => {
    const index = todoList.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).send('not found');

    todoList.splice(index, 1);
    res.status(204).send();
});

export default router;
