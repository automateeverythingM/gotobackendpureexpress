exports.roomStateDTO = async (room) => {
  let roomPopulated = await room.execPopulate("users");
  roomPopulated = await room.execPopulate("messages");
  return {
    usersList: roomPopulated.users,
    messages: roomPopulated.messages,
  };
};
