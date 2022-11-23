import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import * as User from "./utils/users.js";
import * as Room from "./utils/rooms.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    const { name, user, room, host, presenter } = data;
    const users = User.addUser({ name, user, room, host, presenter });
    if (host) Room.addRoom({ room });
    socket.join(room);
    socket.emit("message", { message: `Welcome to the room!` });
    socket.broadcast
      .to(room)
      .emit("message", { message: `${name} has joined` });
    socket.emit("user-is-joined", { success: true, users });
    socket.broadcast.to(room).emit("all-users", { users });

    const _room = Room.getRoom({ room });
    io.to(room).emit("board", { canvasImage: _room?.canvasImage });
  });

  socket.on("draw", (data) => {
    const { room, canvasImage } = data;
    Room.updateRoom({ room, canvasImage });
    socket.broadcast.to(room).emit("board", { canvasImage });
  });

  socket.on("disconnect", () => {
    const userLeaves = User.removeUser({ user: socket.id });

    if (userLeaves) {
      const users = User.getUsers(userLeaves.room);
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.name} left the chat`,
      });
      io.to(userLeaves.room).emit("all-users", { users });
    }
  });
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
