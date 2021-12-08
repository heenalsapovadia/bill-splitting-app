const bodyParser = require("body-parser");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
var dynamo = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO implement
  const resp = {
    userId: "hs",
    friends: [
      { id: "1", amt: 2 },
      { id: "2", amt: 34 },
    ],
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify("this is from lambda"),
    obj: resp,
  };
  console.log("event printed : ", event);
  let eventObj = event.requestContext.http;
  let requestParams = event.queryStringParameters;

  // if (event.path === "/transactions" && event.httpMethod === "GET") {
  if (eventObj.method === "GET" && eventObj.path === "/transactions") {
    let userId = requestParams.userId;
    console.log("inside GET : its for user : ", userId);
    console.log("request from /transaction GET : ", eventObj.method); //event.queryStringParameters.userId);

    async function fetchTransactions() {
      try {
        var params = {
          KeyConditionExpression: "userId = :user",
          ExpressionAttributeValues: {
            ":user": { S: userId },
          },
          TableName: "transactions",
        };
        var result = await dynamo.query(params).promise();
        console.log(JSON.stringify(result));
        let txnList = [];
        result.Items.forEach((item) => {
          let txn = {
            userId: item.userId.S,
            timestamp: item.timestamp.S,
            amount: item.amount.N,
            splitUserId: item.splitUserId.S,
            description: item.description.S,
          };
          txnList.push(txn);
          console.log(txn);
        });
        return {
          statusCode: 200,
          body: JSON.stringify({
            allTxn: txnList,
          }),
          headers: { "Content-Type": "application/json" },
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            msg: "fetch Failed",
          }),
          headers: { "Content-Type": "application/json" },
        };
      }
    }
    let scanRes = await fetchTransactions();
    return scanRes;
  }
  if (eventObj.method === "POST" && eventObj.path === "/transactions") {
    let userId = requestParams.userId;
    console.log("from inside POST!!!", requestParams.userId);
    console.log("body : ", JSON.parse(event.body));

    let txnDate = "08-12-2021";
    let reqBody = JSON.parse(event.body);
    var params = {
      TableName: "transactions",
      Item: {
        userId: userId,
        timestamp: Date.now().toString(),
        splitUserId: reqBody.splitUserId,
        isSettled: false,
        amount: reqBody.amount,
        description: reqBody.description,
      },
    };
    console.log("Adding the new item : ");
    function scan(params) {
      console.log("inside func scan");
      return new Promise((resolve, reject) => {
        console.log("inside new Promise");
        docClient.put(params, function (err, data) {
          if (err) {
            console.error(
              "Unable to add item. Error JSON:",
              JSON.stringify(err, null, 2)
            );
            reject({
              statusCode: 500,
              body: JSON.stringify({
                msg: "Insert Failed",
              }),
              headers: { "Content-Type": "application/json" },
            });
          } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            resolve({
              statusCode: 200,
              body: JSON.stringify({
                msg: "Successful insert",
              }),
              headers: { "Content-Type": "application/json" },
            });
          }
        });
      });
    }
    console.log("before scan ....");
    let scanRes = await scan(params);
    console.log("scnaRes, ", scanRes);
    console.log("after scan ....");

    return scanRes;
  }

  if (eventObj.method === "GET" && eventObj.path === "/user") {
    let userId = requestParams.userId;
    console.log("inside GET : its for user : ", userId);
    console.log("request from /user GET : ", eventObj.method); //event.queryStringParameters.userId);

    var params = {
      TableName: "user",
      Key: {
        userId: { S: userId },
      },
    };

    async function logSingleItem(params) {
      try {
        var result = await dynamo.getItem(params).promise();
        console.log(JSON.stringify(result));
        let userObj = result.Item;

        return {
          statusCode: 200,
          body: JSON.stringify({
            userId: userObj.userId.S,
            userName: userObj.userName.S,
            mobileNumber: userObj.mobileNumber.N,
          }),
          headers: { "Content-Type": "application/json" },
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            msg: "fetch Failed",
          }),
          headers: { "Content-Type": "application/json" },
        };
      }
    }

    console.log("before scan ....");
    let scanRes = await logSingleItem(params);
    console.log("scnaRes, ", scanRes);
    console.log("after scan ....");
    return scanRes;
  }

  if (eventObj.method === "POST" && eventObj.path === "/user") {
    let reqBody = JSON.parse(event.body);

    var params = {
      TableName: "user",
      Item: {
        userId: reqBody.userId,
        userName: reqBody.userName,
        mobileNumber: reqBody.mobileNumber,
      },
    };
    console.log("Adding new user : ");
    function scan(params) {
      console.log("inside func scan");
      return new Promise((resolve, reject) => {
        console.log("inside new Promise");
        docClient.put(params, function (err, data) {
          if (err) {
            console.error(
              "Unable to add item. Error JSON:",
              JSON.stringify(err, null, 2)
            );
            reject({
              statusCode: 500,
              body: JSON.stringify({
                msg: "USER Insert Failed",
              }),
              headers: { "Content-Type": "application/json" },
            });
          } else {
            console.log("Added user item:", JSON.stringify(data, null, 2));
            resolve({
              statusCode: 200,
              body: JSON.stringify({
                msg: "Successful USER insert",
              }),
              headers: { "Content-Type": "application/json" },
            });
          }
        });
      });
    }
    console.log("before scan ....");
    let scanRes = await scan(params);
    console.log("scnaRes, ", scanRes);
    console.log("after scan ....");

    return scanRes;
  }
  return response;
};
