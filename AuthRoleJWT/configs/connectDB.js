import mongoose from "mongoose"
import * as dotenv from "dotenv";
import Role from "../models/roleModel.js";
dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    initial()
    console.log("DB connection")
  } catch (err) {
    console.error(err);
  }
}

const initial = () => {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count > 0) {
        return;
      }
      new Role({ name: 'user' }).save().then(() => {
        console.log("added 'user' to roles collection");
      });

      new Role({ name: 'moderator' }).save().then(() => {
        console.log("added 'moderator' to roles collection");
      });

      new Role({ name: 'admin' }).save().then(() => {
        console.log("added 'admin' to roles collection");
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export default connectDB