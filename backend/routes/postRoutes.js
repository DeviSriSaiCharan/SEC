import express from "express";
import { verifyToken } from "../middlewares/verfiyToken.js";
import { upload } from "../imagesHandlers/multerHandle.js";
import { getFeed, newPost, postLike, userPosts } from "../controllers/postControllers.js";

const router=express.Router();

router.get("/feed",verifyToken,getFeed);//get all posts used for feed
router.get("/:id/posts",verifyToken,userPosts); //single users posts

router.patch("/:id/like",verifyToken,postLike);

router.post("/new",verifyToken,upload.single("image"),newPost)

export default router;