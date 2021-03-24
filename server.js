const express = require("express");
const app = express();
const RoomService = require("./src/service/RoomService");
const http = require("http").createServer(app);
const dotenv = require("dotenv");
const { socketOnReceiveEmit, messageGenerator } = require("./src/utils");
const { MESSAGE_TYPE } = require("./src/utils/actions");
const io = require("socket.io")(http, {
  cors: {
    origin: "https://gotoexpress.herokuapp.com/",
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
    socket.to(roomName).emit("newUser", {
      message: messageGenerator(MESSAGE_TYPE.USER_JOIN, user),
    });
    // socketOnReceiveEmit(socket, "newMessage", "updateMessages", data.roomName);
  });

  socketOnReceiveEmit(socket, "typing", "userTyping");
  socketOnReceiveEmit(socket, "stopTyping", "userStopTyping");
  socketOnReceiveEmit(
    socket,
    "newMessage",
    "updateMessages",
    (roomName, dataMsg) => {
      const { message } = dataMsg;
      RoomService.pushMessageToRoom(roomName, message);
    }
  );

  socketOnReceiveEmit(socket, "leaveRoom", null, (roomName, data) => {
    const { user } = data;
    RoomService.leaveRoom(roomName, user);
    socket.leave(roomName);
    socket.to(roomName).emit("userLeft", {
      message: messageGenerator(MESSAGE_TYPE.USER_LEFT, user),
    });
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
