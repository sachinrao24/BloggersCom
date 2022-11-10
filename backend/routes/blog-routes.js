import express from "express";
import { addBlog, deleteById, getAllBlogs, getById, getByUserId, updateBlog } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.get("/user/:id", getByUserId);

blogRouter.post("/add", addBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.delete("/:id", deleteById);

export default blogRouter;