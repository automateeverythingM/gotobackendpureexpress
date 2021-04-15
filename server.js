const express = require("express");
const app = express();
const RoomService = require("./src/service/RoomService");
const http = require("http").createServer(app);
const dotenv = require("dotenv").config();
const cors = require("cors");
const { socketOnReceiveEmit, messageGenerator } = require("./src/utils");
const { MESSAGE_TYPE } = require("./src/utils/actions");
const connectDB = require("./src/data/mongoDB");

connectDB();

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
  allowEIO3: false,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

console.log(process.env.CORS);

io.on("connection", (socket) => {
  socket.on("join room", async (data) => {
    const { roomName, user } = data;

    socket.join(roomName);
    RoomService.userJoinRoom(roomName, user, (initState) => {
      io.to(socket.id).emit("initialState", initState);
    });

    socket.to(roomName).emit("newUser", {
      message: messageGenerator(MESSAGE_TYPE.USER_JOIN, user),
    });
    // socketOnReceiveEmit(socket, "newMessage", "updateMessages", data.roomName);
  });

  socket.on("registerUser", async (user) => {
    const updatedUser = await RoomService.userExistsOrCreateNew(user);
    io.to(socket.id).emit("updateUser", updatedUser);
  });

  // socketOnReceiveEmit(socket, "registerUser", null, async (_, user) => {});

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
    RoomService.leaveRoom(roomName, user, () => {
      socket.leave(roomName);
      socket.to(roomName).emit("userLeft", {
        message: messageGenerator(MESSAGE_TYPE.USER_LEFT, user),
      });
    });
  });

  socket.on("disconnecting", (data) => {
    console.log("disconnecting fired");
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

const PORT = process.env.PORT || 5001;

http.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port `,
    PORT
  )
);
