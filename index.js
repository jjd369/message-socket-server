import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  }
});


let users = []

const messages = {
  general: [],
  randam: [],
  jokes: [],
  javascript: []
}

io.on('connection', socket => {
  socket.on("join server", (username) => {
    console.log(username)
    const user = {
      username: username,
      id: socket.id,
    }

    users.push(user)

    io.emit("new user", users)
  })

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });

  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    console.log(chatName)
    if (isChannel) {
      const payload = {
        content,
        chatName,
        sender
      };
      socket.to(to).emit("new message", payload);
    } else {
      const payload = {
        content,
        chatName: sender,
        sender
      };
      socket.to(to).emit("new message", payload);
    }
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content
      });
    }
  });

  socket.on("leave server", () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
  })

  socket.on("disconnect", () => {
    console.log('disconnect')
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
  });
});


function generateNumber() {
  const num = Math.random * 10000
  return Math.ceil(num)
}

httpServer.listen(3333, () => { console.log('server is running on port 8081s') });