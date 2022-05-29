import Post from "../models/Post.js";
import User from "../models/User.js";

export const updateUser =  async(req, res) => {
    try {
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true}, (err, docs) => {
            if(err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.status(200).json(docs);
            }
        })
    } catch(err) {
        res.status(401).json(err);
    }
}

export const deleteUser = async(req, res) => {
    if(req.body.userId === req.params.id) {
       const user = await User.findById(req.params.id);
       if(user) {
        try{
            await Post.deleteMany({username: user.username});
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Updated user!");
    
        }catch(err){
            res.status(500).json(err);
        }
       } else {
           res.status(404).json("User not found!");
       }
    } else {
        res.status(401).json("The User id seems to be incorrect!");
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user;
        res.status(200).json(others);
    } catch(err) {
        res.status(500).json(err);
    }
}
