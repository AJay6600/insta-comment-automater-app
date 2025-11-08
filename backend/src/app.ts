import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import accountRoute from './routes/accountRoute';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/accounts', accountRoute);

app.use(errorHandler);

export default app;
