import Post from "../models/Post.js";

//CREATE POST
export const createPost = async(req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save(function(err) {
            if(!err) res.status(200).json(newPost);
        });
    }catch(err) {
        res.status(500).json(err);
    }
}


//UPDATE POST
export const updatePost =  async(req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true}, (err, docs) => {
            if(err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                console.log(docs);
                res.status(200).json(docs);
            }
        })
    } catch(err) {
        res.status(500).json(err);
    }
}

//DELETE POST
export const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id);
            } catch(err) {
                res.status(500).json(err);
            }
        } else req.status(404).json("You can only delete the posts posted by you!")
    } catch(err) {
        res.status(500).json(err);
    }
}


//GET POST
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
}


//GET ALL POSTS
export const getAllPosts = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        if(username) {
            Post.find({username: username}, (err, docs) => {
                res.status(200).json(docs);
            });
        }
        else if(catName) {
            Post.find({categories : {$in : [catName]}}, (err, docs) => {
                res.status(200).json(docs);
            });
            
        } else if(username && catName) {
            Post.find({username: username, categories : {$in : [catName]}}, (err, docs) => {
                res.status(200).json(docs);
            });
        } else {
            Post.find({}, (err, docs) => {
                res.status(200).json(docs);
            });
        }
    } catch(err) {
        res.status(500).json(err);
    }
}