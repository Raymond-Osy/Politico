import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();
const http = require('http');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for was not found');
});

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

export default app;
