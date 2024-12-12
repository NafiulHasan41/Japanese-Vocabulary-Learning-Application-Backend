import express from "express";
import {
  createVocabulary,
  getAllVocabularies,
  updateVocabulary,
  deleteVocabulary,
} from "../controllers/vocabularyController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, adminOnly, getAllVocabularies).post(protect, adminOnly, createVocabulary);
router.route("/:id").put(protect, adminOnly, updateVocabulary).delete(protect, adminOnly, deleteVocabulary);

export default router;
