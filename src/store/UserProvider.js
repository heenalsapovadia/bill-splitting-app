import { useReducer } from "react";
import UserContext from "./user-context";

const defaultUserState = {
  userProfile: {},
  totalSum: 0,
  allTransactions: [],
};

const userReducer = (state, action) => {
  if (action.type === "LOAD_USER") {
    console.log("inside load user action ....");
    return {
      userProfile: { ...action.user },
      totalSum: state.totalSum,
      allTransactions: [...state.allTransactions],
    };
  }
  if (action.type === "LOAD_TXNS") {
    console.log("inside load TXN action ....");
    console.log(state.userProfile);
    console.log(state.totalSum);
    console.log(action.transactions.allTxn);
    return {
      userProfile: { ...state.userProfile },
      totalSum: state.totalSum,
      allTransactions: [...action.transactions.allTxn],
    };
  }
  return defaultUserState;
};

const UserProvider = (props) => {
  const [userState, dispatchAction] = useReducer(userReducer, defaultUserState);

  const setUserHandler = (user) => {
    dispatchAction({ type: "LOAD_USER", user: user });
  };

  const loadTransactionsHandler = (transactions) => {
    dispatchAction({ type: "LOAD_TXNS", transactions: transactions });
  };

  const userContext = {
    userProfile: userState.userProfile,
    totalSum: userState.totalSum,
    allTransactions: userState.allTransactions,
    setUser: setUserHandler,
    setTransactions: loadTransactionsHandler,
  };
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
