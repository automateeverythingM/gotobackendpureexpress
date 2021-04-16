exports.roomStateDTO = async (room) => {
  let roomPopulated = await room.execPopulate({
    path: "messages",
    populate: { path: "user" },
  });
  roomPopulated = await room.execPopulate("users");
  console.log(
    "🚀 ~ file: roomStateDTO.js ~ line 7 ~ exports.roomStateDTO= ~ roomPopulated",
    roomPopulated
  );
  return {
    usersList: roomPopulated.users,
    messages: roomPopulated.messages,
  };
};
