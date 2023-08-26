import express from "express";
import { signIn, signOut, signUp } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", signUp);
router.post("/auth", signIn);
router.post("/signout", signOut);

export default router;
