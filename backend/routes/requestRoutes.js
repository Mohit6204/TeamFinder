import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import { acceptedRequest, applyTeam, confirmation, joinRequest, pendingRequest } from "../controllers/request.js";

const router=express.Router();

router.get("/pending",verifyToken,pendingRequest);
router.get("/accepted",verifyToken,acceptedRequest);
router.get("/join",verifyToken,joinRequest);
router.post("/apply",verifyToken,applyTeam);
router.post("/confirmation",verifyToken,confirmation);


export default router;

