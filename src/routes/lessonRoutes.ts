import express from "express";
import { createLesson, getAllLessons, updateLesson, deleteLesson } from "../controllers/lessonController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, adminOnly, getAllLessons).post(protect, adminOnly, createLesson);
router.route("/:id").put(protect, adminOnly, updateLesson).delete(protect, adminOnly, deleteLesson);

export default router;
