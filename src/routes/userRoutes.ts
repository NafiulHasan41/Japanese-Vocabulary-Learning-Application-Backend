import express from "express";
import { getUsers, updateUserRole } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";
import { getLessonsForUser } from "../controllers/lessonController";
import { getVocabulariesForLesson } from "../controllers/vocabularyController";
import { getTutorialVideos } from "../controllers/tutorialController";

const router = express.Router();

router.route("/").get(protect, adminOnly, getUsers);
router.route("/:id").put(protect, adminOnly, updateUserRole);
router.get("/lessons", getLessonsForUser); 
router.get("/lessons/:lessonNumber/vocabularies", getVocabulariesForLesson);
router.get("/tutorial", protect, getTutorialVideos);

export default router;
