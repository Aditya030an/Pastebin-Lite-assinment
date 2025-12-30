import express from "express";
import { createPaste, fetchPaste } from "../controllers/paste.controller.js";

const router = express.Router();

router.post("/", createPaste);
router.get("/:id", fetchPaste);

export default router;
