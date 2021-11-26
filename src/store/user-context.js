import React from "react";

const UserContext = React.createContext({
  //   lendAmount: 0,
  //   borrowAmount: 0,
  totalSum: 0,
  friendsList: [],
  setUser: (user) => {},
  addFriend: (friend) => {},
});

export default UserContext;
