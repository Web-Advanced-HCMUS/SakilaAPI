import express from 'express'
import morgan from 'morgan';
import createError from 'http-errors';
import {dirname} from 'path'
import {fileURLToPath} from 'url';

import actorRoute from './components/actor/actor.route.js';
import categoryRoute from './components/category/category.route.js';
import filmRoute from './components/film/film.route.js';
import authRoute from './components/auth/auth.route.js';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import {winstonLogger, winstonErrorLogger} from "./log/winston.log.js";

import {verifyAccessToken} from './components/auth/jwt.init.js';

import {Server} from 'socket.io';
import SocketService from './components/actor/actor.service.js';
import {createServer} from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {cors: {origin: '*'}});
io.on('connection', function (socket) {
    console.log(`user connect is ${socket.id}`);

    const {roomId} = socket.handshake.query;
    socket.join(roomId);

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
    });

    // Listen to message event client send to server
    socket.on('login', (msg) => {
        console.log(`User: `, msg);
    })

    socket.on('actor change', (msg) => {
        io.emit('actor change', msg);
    })
})

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

app.use(express.json());
app.use(morgan('dev'));

app.use(winstonLogger);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/actors', verifyAccessToken, function (req, res) {
    res.sendFile(__dirname + '/Actor.html');
});

app.use('/api/actors', verifyAccessToken, actorRoute);
app.use('/api/categories', verifyAccessToken, categoryRoute);
app.use('/api/films', verifyAccessToken, filmRoute);
app.use('/api/auth', authRoute);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(function (req, res, next) {
    next(createError(404, 'NotFound'))
})

app.use((err, req, res, next) => {
    res.json({
        status: err.statusCode || 500,
        message: err.statusMessage
    })
})

app.use(winstonErrorLogger);

//global.__io.on('connection', SocketService.connection(server));

const PORT = process.env.port || 3030;
app.set('port', PORT)
httpServer.listen(app.get('port'), function () {
    console.log(`Listening on port ${PORT}`)
})
