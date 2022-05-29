import express from "express";
const router = express.Router();
import {registerUser, loginUser} from "../controllers/auth.js";

//REGISTER
router.post("/register", registerUser);


//LOGIN
router.post("/login", loginUser);



export default router;