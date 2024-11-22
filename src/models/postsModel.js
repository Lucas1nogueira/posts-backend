import "dotenv/config";
import { ObjectId } from "mongodb";
import dbConnect from "../config/dbConfig.js";

// Establish a connection to the database using the connection string from environment variables
const conn = await dbConnect(process.env.CONN_STRING);
// Access the "imersao-instabytes" database from the connection
const db = conn.db("imersao-instabytes");
// Access the "posts" collection from the database
const collection = db.collection("posts");

// Define an asynchronous function to retrieve all posts from the database
export async function getAllPosts() {
  // Fetch all posts and convert them to an array
  return collection.find().toArray();
}

// Define an asynchronous function to insert a new post in the database
export async function createPost(newPost) {
  return collection.insertOne(newPost);
}

// Define an asynchronous function to update one post by ID in the database
export async function updatePost(id, post) {
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne({ _id: new ObjectId(objID) }, { $set: post });
}
