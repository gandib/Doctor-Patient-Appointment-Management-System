import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Doctor-Patient Appointment Management System!');
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
