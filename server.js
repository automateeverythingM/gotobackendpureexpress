const express = require("express");
const app = express();
const RoomService = require("./src/service/RoomService");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
  allowEIO3: false,
});

app.use(express.json());
app.use(express.urlencoded());

io.on("connection", (socket) => {
  socket.on("join room", (data) => {
    const { roomName, user } = data;

    socket.join(roomName);
    const initState = RoomService.userJoinRoom(roomName, user);

    io.to(socket.id).emit("initialState", initState);

    socket.on("newMessage", (dataMsg) => {
      RoomService.pushMessageToRoom(roomName, dataMsg);
      socket.to(roomName).emit("updateMessages", dataMsg);
    });

    // socketOnReceiveEmit(socket, "newMessage", "updateMessages", data.roomName);
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

const PORT = process.env.PORT || 5001;

http.listen(PORT, () => console.log(PORT));
