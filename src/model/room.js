class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.messages = [];
  }

  addUser(user) {
    this.users = [...this.users, user];
    // this.users.push(user);
    return user;
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.uid !== id);
  }

  pushMessage(message) {
    this.messages = [...this.messages, message];
    // this.messages.push(message);
    return message;
  }

  get roomState() {
    return { messages: this.messages, users: this.users };
  }

  get isRoomEmpty() {
    return this.users.length === 0;
  }
}

module.exports = Room;
