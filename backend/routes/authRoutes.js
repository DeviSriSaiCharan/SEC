import express from 'express';
import { login, logout, signup } from '../controllers/authControllers.js';
import { upload } from '../imagesHandlers/multerHandle.js';
const router=express.Router();
router.use(express.json());




router.post("/signup",upload.single("profilepic"),signup);
router.post("/login",login);
router.get("/logout",logout)

export default router;