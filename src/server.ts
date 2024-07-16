// src/server.ts
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import todoRoutes from './routes/todoRoutes';

const app: Application = express();
const port: number = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', todoRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('BeDee BE');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});