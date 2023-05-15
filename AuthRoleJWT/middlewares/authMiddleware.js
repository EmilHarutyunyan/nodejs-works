import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import UserToken from "../models/userTokenModel.js";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Token not found in authorization header" });
  }

  try {
    const privateKey = process.env.JWT_REFRESH_SECRET;
    let tokenDetails = jwt.verify(token, privateKey);
    
    req.tokenDetails = tokenDetails;
    req.refreshToken = token;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: true,message: "Invalid refresh token" });
  }
};
export { authMiddleware };
