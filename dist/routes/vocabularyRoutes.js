"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vocabularyController_1 = require("../controllers/vocabularyController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/").get(authMiddleware_1.protect, authMiddleware_1.adminOnly, vocabularyController_1.getAllVocabularies).post(authMiddleware_1.protect, authMiddleware_1.adminOnly, vocabularyController_1.createVocabulary);
router.route("/:id").put(authMiddleware_1.protect, authMiddleware_1.adminOnly, vocabularyController_1.updateVocabulary).delete(authMiddleware_1.protect, authMiddleware_1.adminOnly, vocabularyController_1.deleteVocabulary);
exports.default = router;
