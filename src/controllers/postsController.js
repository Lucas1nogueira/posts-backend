import fs from "fs";
import chalk from "chalk";
import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import generateImageDescription from "../services/geminiService.js";

export async function listAllPosts(req, res) {
  try {
    // Call the function to get all posts
    const posts = await getAllPosts();
    // Respond with a 200 status and the posts data
    res.status(200).json(posts);
  } catch (err) {
    // Log any errors that occur during fetching
    console.log(chalk.redBright("Error fetching posts: ", err.message));
    // Respond with a 500 status and an error message
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function newPost(req, res) {
  const post = req.body;

  try {
    const createdPost = await createPost(post);
    res.status(200).json(createdPost);
  } catch (err) {
    console.log(chalk.redBright("Error creating new post: ", err.message));
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function imageUpload(req, res) {
  const post = {
    description: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const createdPost = await createPost(post);
    const updatedImg = `uploads/${createdPost.insertedId}.png`;
    fs.renameSync(req.file.path, updatedImg);
    res.status(200).json(createdPost);
  } catch (err) {
    console.log(chalk.redBright("Error creating new post: ", err.message));
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function changePost(req, res) {
  const id = req.params.id;
  const url = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await generateImageDescription(imgBuffer);
    const changedPost = {
      imgUrl: url,
      description: description,
      alt: req.body.alt,
    };
    const updatedPost = await updatePost(id, changedPost);
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(chalk.redBright("Error creating new post: ", err.message));
    res.status(500).json({ error: "Failed to create post" });
  }
}
