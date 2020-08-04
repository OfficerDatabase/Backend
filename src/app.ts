import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helpers from './util/helpers';

const app = express();
const host: string = process.env.BACKEND_HOST || 'localhost';
const port: number = parseInt(process.env.BACKEND_PORT) || 8080;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Unknown endpoint' });
});

app.use((error, req, res, _) => {
    console.error(error);
    res.status(500).json({ error: 'Internal error' });
});

app.listen(port, host, () => {
    console.log(`Listening on http://${ host }:${ port }`);
});
