import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import generateTokens from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import UserToken from "../models/userTokenModel.js";

const register = async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(
      req.body.password,
      (process.env.HASH_PASSWORD)
    );
    const roles = await Role.find({
      name: { $in: req.body.roles || ["user"] },
    });
    req.body.roles = roles.map((role) => role.name);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    const { accessToken, refreshToken } = await generateTokens(user);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      username: user.username,
      email: user.email,
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req;
    if (req.cookies) {
      res.clearCookie("refreshToken");
    }

    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Successfully" });

    await userToken.deleteOne();
    res.status(200).json({ error: false, message: "Logged Out Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
const refresh = async (req, res) => {
  try {
    const { tokenDetails, refreshToken } = req;
    
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken)
      return res.status(401).json({ error: true, message: "Invalid User" });
    
    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const user = await User.findOne({ _id: tokenDetails._id });
    if (!user)
      return res.status(401).json({ error: true, message: "Invalid User" });

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "5s",
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      error: false,
      username: user.username,
      email: user.email,
      refreshToken,
      accessToken,
      message: "Access token created successfully",
    });
  } catch (error) {
    console.log("error :", error);
    res.status(400).json(error);
  }
};

const authController = { register, login, refresh, logout };
export default authController;
