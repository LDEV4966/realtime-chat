//Helper Functions that we are going to use in the index.js about Every users state

const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  } else {
    const user = { id, name, room };
    users.push(user);
    return { user };
    // It can be known us exactly which user was pushed ,
    //i wonder why we have to use return by {}, user is already Object
  }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id); // return -1, if there is none.
  if (index !== -1) {
    return users.splice(index, 1)[0];
    // splice로 index로 부터 1개만큼 arr에서 삭제하고,
    // 삭제한것을 0번째 인덱스에 넣어 반환시켜 어떤 유저가 삭제되었는지 판별가능
  }
};

const getUser = (id) => users.find((user) => user.id === id); // return specific user who we want to find

const getUserInRoom = (room) => users.filter((user) => user.room === room); // return specific users array who participating in that room

module.exports = { addUser, removeUser, getUser, getUserInRoom };
