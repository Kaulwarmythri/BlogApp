import User from "../models/User.js";
import bcrypt from "bcrypt";


export const registerUser =  async(req, res) => {
    const saltRounds = 10;
    try{
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const newUser = await user.save();
        res.status(200).json(newUser);
    }catch(err){
        res.send(err);
    }
}

export const loginUser = async(req, res) => {
    try{
       const user = await User.findOne({email: req.body.email});
       if(!user) res.status(400).json("User not found");

       const validated = await bcrypt.compare(req.body.password, user.password);
       if(!validated) res.status(500).json("Wrong Password");

       validated && res.status(200).json(user);
        
    }catch(err) {
        res.status(500).json(err);
    }
}

