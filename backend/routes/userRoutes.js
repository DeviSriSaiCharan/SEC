import express from "express";
import {verifyToken} from "../middlewares/verfiyToken.js";
import { addRemovefriend, getUser, getUserFriends } from "../controllers/userControllers.js";



const router=express.Router();
router.use(express.json());



router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

router.patch("/:id/:friendId",verifyToken,addRemovefriend);

export default router;