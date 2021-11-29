import React from "react";

const UserContext = React.createContext({
  userProfile: {},
  totalSum: 0,
  allTransactions: [],
  setUser: (user) => {},
  setTransactions: (transactions) => {},
});

export default UserContext;
