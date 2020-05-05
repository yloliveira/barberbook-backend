import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import updloadConfig from './config/upload';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use('/files', express.static(updloadConfig.directory));
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => {
  console.log('server started on port 3333...');
});
