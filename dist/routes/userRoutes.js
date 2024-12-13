"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const lessonController_1 = require("../controllers/lessonController");
const vocabularyController_1 = require("../controllers/vocabularyController");
const tutorialController_1 = require("../controllers/tutorialController");
const router = express_1.default.Router();
router.route("/").get(authMiddleware_1.protect, authMiddleware_1.adminOnly, userController_1.getUsers);
router.route("/:id").put(authMiddleware_1.protect, authMiddleware_1.adminOnly, userController_1.updateUserRole);
router.get("/lessons", lessonController_1.getLessonsForUser);
router.get("/lessons/:lessonNumber/vocabularies", vocabularyController_1.getVocabulariesForLesson);
router.get("/tutorial", authMiddleware_1.protect, tutorialController_1.getTutorialVideos);
exports.default = router;
