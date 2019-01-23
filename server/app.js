import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for was not found');
});

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
