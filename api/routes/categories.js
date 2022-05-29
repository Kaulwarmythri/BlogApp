import express from "express";
const router = express.Router();
import {createCat, getCats} from "../controllers/categories.js";


//CREATE
router.post("/", createCat);


//GET ALL POSTS
router.get("/", getCats);


export default router;