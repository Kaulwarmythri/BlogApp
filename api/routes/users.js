import express from "express";
import passport from "passport";
const router = express.Router();
import {updateUser, deleteUser, getUser} from "../controllers/users.js";


//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GOOGLE LOGIN
router.get("/google", (req, res) => {
    passport.authenticate("google", {scope: ["profile"] });
})

//CALLBACK URL
router.get("/google/callback", (req, res) => {
    passport.authenticate("google", 
    {
        successRedirect: "https://localhost:3000/",
        failureRedirect: "https://localhost:3000/login"
    })
});

export default router;