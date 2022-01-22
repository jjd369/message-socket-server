import { Server } from "socket.io";
import globalEmitter from './globalEmitter';
import httpServer from '../config/server';

const login_users = new Map();


const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true
  }
});

io.on("connection", socket => {
  console.log('connection')
  globalEmitter.on("login", username => {
    login_users.set(username, socket.id)
    // io.emit("new user", [...login_users.keys()]);
  })
  globalEmitter.on('logout', username => {
    login_users.delete(username)
    // io.emit("new user", [...login_users.keys()]);
  })

  socket.on("disconnect", () => {
    console.log('disconnection')
    // users = users.filter(u => u.id !== socket.id);
    // io.emit("new user", users);
  });

  // socket.on("join server", username => {
  //   const user = {
  //     username: username,
  //     id: socket.id
  //   };

  //   users.push(user);
  //   const regex = new RegExp(username, "g");
  //   const map_messages = Object.keys(messages).filter(el => {
  //     let match_el = el.match(regex);
  //     return match_el && match_el.length > 0;
  //   });
  //   const filter_message = {};
  //   map_messages.forEach(el => {
  //     filter_message[el] = messages[el];
  //   });
  //   console.log(filter_message);

  //   io.emit("new user", users, filter_message);
  // });

  // socket.on("join room", (roomName, cb) => {
  //   socket.join(roomName);
  //   if (!messages[roomName]) {
  //     messages[roomName] = [];
  //   }
  //   cb(messages[roomName]);
  // });

  socket.on("send message", ({ content, to, sender, chatName }) => {
    const payload = {
      content,
      chatName,
      sender
    };
    socket.to(to).emit("new message", payload);
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content
      });
    }
  });

  // socket.on("leave room", roomName => {
  //   socket.leave(roomName);
  // });

  // socket.on("leave server", () => {
  //   users = users.filter(u => u.id !== socket.id);
  //   io.emit("new user", users);
  // });

  // socket.on("disconnect", () => {
  //   users = users.filter(u => u.id !== socket.id);
  //   io.emit("new user", users);
  // });
});

export default io