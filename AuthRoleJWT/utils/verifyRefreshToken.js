import UserToken from "../models/userTokenModel.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config()
const verifyRefreshToken = async (refreshToken) => {
  const privateKey = process.env.JWT_REFRESH_SECRET;
  const userToken = await UserToken.findOne({ token: refreshToken });

  if (!userToken)
    return res
      .status(401)
      .json({ error: true, message: "Invalid email or password" });

  try {
    let tokenDetails = jwt.verify(refreshToken, privateKey)
    console.log('tokenDetails :', tokenDetails);
    return tokenDetails
  } catch (err) {
    throw { message: "Invalid refresh token" };
  }

};

export default verifyRefreshToken;