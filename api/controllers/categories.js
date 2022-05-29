import Category from "../models/Category.js";

//CREATE CATEGORY
export const createCat = async(req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(err) {
        res.status(500).json(err);
    }
}

//GET ALL POSTS

export const getCats = async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch(err) {
        res.status(500).json(err);
    }
}