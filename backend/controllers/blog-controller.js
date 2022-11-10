import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;

    try{
        blogs = await Blog.find().populate('user');
    }catch(err){
        console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message:"No blogs found..."})
    }
    return res.status(200).json({blogs});
}

export const addBlog = async (req, res, next) => {
    const {title, description, image, user } = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "Cannot find user with this ID..."});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction(); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
    return res.status(200).json({blog});
}

export const updateBlog = async (req, res, next) => {
    const {title, description} = req.body;
    const blogID = req.params.id;
    
    let blog;

    try{
        blog = await Blog.findByIdAndUpdate(blogID, {
            title,
            description
        });
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Could not update blog, try again later..."});
    }
    return res.status(200).json({blog});
}

export const getById = async (req, res, next) => {
    const {id} = req.params.id;
    const {title, description} = req.body;
    let blog;

    try{
        blog = await Blog.findById(id,{
            title,
            description
        });
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"Could not find blog, try looking for a different one..."});
    }
    return res.status(200).json({blog});
}

export const deleteById = async (req, res, next) => {
    const {id} = req.params.id;
    const {title, description} = req.body;
    let blog;

    try{
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to delete"});
    }
    return res.status(200).json({message:"Successfully deleted!"});
}

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate('blogs');
    }
    catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blogs found!"});
    }
    return res.status(200).json({user:userBlogs});
}