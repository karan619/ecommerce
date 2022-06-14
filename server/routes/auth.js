import express from "express";
import { signUp, signIn } from "../controllers/user";

const router = express.Router();

//REGISTER
router.post("/register", signUp);
router.post("/login", signIn);

export default router;
