import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import axios from "axios";
import { PORT, API_ENDPOINT, PRIVATE_KEY } from "./config/config.js";
console.log('PORT :', PORT);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username, secret: username, first_name: username },
      {
        headers: { "private-key": "77917078-7974-4b85-b733-40f2b81e494d" },
      }
    );
    return res.status(response.status).json(response.data)
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }

});

app.listen(PORT, () => {
  console.log("Server Run");
})