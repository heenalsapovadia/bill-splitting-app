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
  // if (action.type === "LOAD_TRANSACTIONS") {
  //   console.log("inside load transactions ...");
  //   // fetch all transactions
  //   let userId = state.userProfile.userId;
  //   let res = await fetch(
  //     "https://80rc5nsfue.execute-api.us-east-2.amazonaws.com/transactions?userId=" +
  //       userId
  //   );
  //   if (!res.ok) {
  //     throw new Error("Could not fetch transactions!");
  //   }
  //   const txnData = await res.json();
  //   console.log("LOAD TRSANCTIONS transactions received - ", txnData);
  //   return {
  //     userProfile: { ...state.userProfile },
  //     totalSum: state.totalSum,
  //     allTransactions: [...txnData.allTxn],
  //   };
  // }

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

  const fetchTransactionHandler = () => {
    dispatchAction({ type: "LOAD_TRANSACTIONS" });
  };

  const userContext = {
    userProfile: userState.userProfile,
    totalSum: userState.totalSum,
    allTransactions: userState.allTransactions,
    setUser: setUserHandler,
    setTransactions: loadTransactionsHandler,
    // fetchTransactions: fetchTransactionHandler,
  };
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
