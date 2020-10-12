import express, {json} from 'express';

const app = express();

// Routes
import IndexRouter from "./routes/index.routes";
import PersonRouter from './routes/person.routes';

//Settings
app.set('port', process.env.PORT || 1234);

// Middlewares
app.use(json());

// Routes
// app.get('/', ((req, res) => res.send('hello word')) );
app.use(IndexRouter);
app.use('/person', PersonRouter);

export default app;