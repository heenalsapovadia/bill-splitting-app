import UserContext from "./user-context";

const defaultUserState = {
  totalSum: 0,
  friendsList: [],
};

const userReducer = (state, action) => {
  if (action.type === "SET") {
    return {
      totalSum: action.user.totalSum,
      friendsList: [...action.user.friendsList],
    };
  }
  return defaultUserState;
};

const UserProvider = (props) => {
  const addFriendHandler = (friend) => {};

  const setUserHandler = () => {};

  const userContext = {
    // lendAmount: 0,
    // borrowAmount: 0,
    totalSum: 0,
    friendsList: [],
    setContext: setUserHandler,
    addFriend: addFriendHandler,
  };
  return <UserContext.Provider>{props.children}</UserContext.Provider>;
};
export default UserProvider;
