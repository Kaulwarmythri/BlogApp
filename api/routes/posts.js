import express from "express";
const router = express.Router();
import {createPost, updatePost, deletePost, getPost, getAllPosts} from "../controllers/posts.js";


//CREATE
router.post("/", createPost);


//UPDATE
router.put("/:id", updatePost)


//DELETE
router.delete("/:id", deletePost)


//GET
router.get("/:id", getPost);

//GET ALL POSTS
router.get("/", getAllPosts);


export default router;