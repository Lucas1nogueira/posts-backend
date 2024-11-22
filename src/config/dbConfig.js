import { MongoClient } from "mongodb";
import chalk from "chalk";

async function dbConnect(connString) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(connString);
    console.log(chalk.greenBright.bold("Connecting to the DB cluster..."));
    await mongoClient.connect();
    console.log(
      chalk.bgGreenBright.bold("Connected to MongoDB Atlas with success!")
    );
    return mongoClient;
  } catch (err) {
    console.log(chalk.bgRed.bold("DB connection error! ", err));
    process.exit();
  }
}

export default dbConnect;
