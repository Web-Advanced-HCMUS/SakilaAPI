import express from 'express'
import morgan from 'morgan';
import asyncErrors from 'express-async-errors';
import {dirname} from 'path'
import {fileURLToPath} from 'url';

import actorRoute from './components/actor/actor.route.js';
import categoryRoute from './components/category/category.route.js';
import filmRoute from './components/film/film.route.js';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import {winstonLogger, winstonErrorLogger} from "./log/winston.log.js";

import {verifyTokenUsingSecretKey} from './components/auth/verifyAPIKey.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "Sakila API Docs"
        },
        host: ["http://localhost:3030"],
        basePath: "/"
    },
    apis: ['./components/*/*.route.js'],
    schema: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
}
const swaggerDocs = swaggerJSDoc(options);

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use(winstonLogger);

app.get('/',function(req,res) {

    res.sendFile(__dirname+'/index.html');
});

app.use('/api/actors',verifyTokenUsingSecretKey, actorRoute);
app.use('/api/categories', verifyTokenUsingSecretKey, categoryRoute);
app.use('/api/films', verifyTokenUsingSecretKey, filmRoute);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(winstonErrorLogger);

const PORT = process.env.port || 3333;
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
})
