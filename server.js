import express from "express";
import chalk from "chalk";
import routes from "./src/routes/postsRoutes.js";

// Create an instance of the express application
const app = express();
routes(app);

app.use(express.static("uploads"));

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log(chalk.bgGreenBright.bold("Server watching..."));
});
