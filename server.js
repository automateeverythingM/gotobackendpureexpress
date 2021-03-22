const express = require("express");
const app = express();
const RoomService = require("./src/service/RoomService");
const http = require("http").createServer(app);
const dotenv = require("dotenv");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
  allowEIO3: false,
});
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());

console.log(process.env.CORS);

io.on("connection", (socket) => {
  socket.on("join room", (data) => {
    const { roomName, user } = data;

    socket.join(roomName);
    const initState = RoomService.userJoinRoom(roomName, user);

    io.to(socket.id).emit("initialState", initState);
    socket.to(roomName).emit("newUser", user);

    // socketOnReceiveEmit(socket, "newMessage", "updateMessages", data.roomName);
  });

  socket.on("newMessage", (dataMsg, roomName) => {
    RoomService.pushMessageToRoom(roomName, dataMsg);
    socket.to(roomName).emit("updateMessages", dataMsg);
  });

  socket.on("leaveRoom", (roomName, user) => {
    RoomService.leaveRoom(roomName, user);
    socket.leave(roomName);
    socket.to(roomName).emit("userLeft", user.uid);
  });

  socket.on("disconnecting", () => {
    console.log("disconnecting fired");
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

const PORT = process.env.PORT || 5001;

http.listen(PORT, () => console.log(PORT));
