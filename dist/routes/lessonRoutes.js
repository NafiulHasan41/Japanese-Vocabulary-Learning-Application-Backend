"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lessonController_1 = require("../controllers/lessonController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/").get(authMiddleware_1.protect, authMiddleware_1.adminOnly, lessonController_1.getAllLessons).post(authMiddleware_1.protect, authMiddleware_1.adminOnly, lessonController_1.createLesson);
router.route("/:id").put(authMiddleware_1.protect, authMiddleware_1.adminOnly, lessonController_1.updateLesson).delete(authMiddleware_1.protect, authMiddleware_1.adminOnly, lessonController_1.deleteLesson);
exports.default = router;
