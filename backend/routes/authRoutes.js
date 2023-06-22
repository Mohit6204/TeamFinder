import express from "express";
import { getUser, login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/getUser",verifyToken,getUser);

export default router;