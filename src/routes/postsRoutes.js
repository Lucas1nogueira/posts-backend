import express from "express";
import multer from "multer";
import cors from "cors";
import {
  listAllPosts,
  newPost,
  imageUpload,
  changePost,
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const upload = multer({ dest: "./uploads" });

const routes = (app) => {
  // Middleware to parse incoming JSON requests
  app.use(express.json());

  // Cors middleware
  app.use(cors(corsOptions));

  // Define a route to handle GET requests for all posts
  app.get("/posts", listAllPosts);

  // Define a route to handle POST request for creating a new post
  app.post("/posts", newPost);

  app.post("/upload", upload.single("image"), imageUpload);

  app.put("/upload/:id", changePost);
};

export default routes;
