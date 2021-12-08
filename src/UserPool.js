import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_QvgvshNDo", //"us-east-1_kPUUDx6Lu",
  ClientId: "4m4hpcl41fvdk9mb2dvtk36o19", //"626on0cu4p9kgr8djipln1taea",
};

export default new CognitoUserPool(poolData);
