import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/index';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/api/v1', router);

// welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    status: '200',
    message: 'Welcome to Politico!'
  });
});

// Default catch-all route that sends back an error message for wrong routes
app.all('/*', (req, res) => {
  res.status(404).send({
    status: '404',
    message: 'The page you were looking for was not found!'
  });
});

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
