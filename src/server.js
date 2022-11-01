import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import ResponseHandler from './utils/respone.js';
import errorHandle from './utils/errorHandle.js';
import apis from './endpoints.js';
import swaggerSpec from './docs.js';

const { PORT } = process.env;

const app = new Express();

app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use((req, res, next) => {
  res.RH = new ResponseHandler(res);
  next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/', apis);

app.use(errorHandle);

const httpServer = http.createServer(app, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });
  res.end('Hi there!');
});

httpServer.listen(PORT, async (error) => {
  if (error) {
    console.log('Cannot start backend services.');
    console.log(error);
  } else {
    console.log(`Backend service is running on port: ${PORT}.`);
  }
});
