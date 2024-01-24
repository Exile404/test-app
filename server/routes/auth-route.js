import express from "express";
import { register, login, logout, googleLogin, googleLoginCallback, success } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get('/google', googleLogin);
router.get('/google/callback', googleLoginCallback);
router.get("/login/success",success)

export default router;