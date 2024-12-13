"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLessonsForUser = exports.deleteLesson = exports.updateLesson = exports.getAllLessons = exports.createLesson = void 0;
const Lesson_1 = __importDefault(require("../models/Lesson"));
const Vocabulary_1 = __importDefault(require("../models/Vocabulary"));
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lessonNumber } = req.body;
    try {
        const lesson = yield Lesson_1.default.create({ name, lessonNumber });
        res.status(201).json(lesson);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ message: "Validation error", errors });
        }
        else if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            res.status(400).json({
                message: `Duplicate value for field: ${duplicateField}`,
                field: duplicateField
            });
        }
        else {
            res.status(500).json({ message: "Failed to create lesson", error: error.message });
        }
    }
});
exports.createLesson = createLesson;
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessons = yield Lesson_1.default.find().lean();
        const enrichedLessons = yield Promise.all(lessons.map((lesson) => __awaiter(void 0, void 0, void 0, function* () {
            const vocabCount = yield Vocabulary_1.default.countDocuments({ lesson: lesson._id });
            return Object.assign(Object.assign({}, lesson), { vocabularyCount: vocabCount });
        })));
        res.status(200).json(enrichedLessons);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch lessons", error });
    }
});
exports.getAllLessons = getAllLessons;
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, lessonNumber } = req.body;
    try {
        const updatedLesson = yield Lesson_1.default.findByIdAndUpdate(id, { name, lessonNumber }, { new: true, runValidators: true });
        if (!updatedLesson) {
            res.status(404).json({ message: "Lesson not found" });
            return;
        }
        res.status(200).json(updatedLesson);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ message: "Validation error", errors });
        }
        else if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            res.status(400).json({
                message: `Duplicate value for field: ${duplicateField}`,
                field: duplicateField,
            });
        }
        else if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid lesson ID" });
        }
        else {
            res.status(500).json({ message: "Failed to update lesson", error: error.message });
        }
    }
});
exports.updateLesson = updateLesson;
const deleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const lesson = yield Lesson_1.default.findById(id);
        if (!lesson) {
            res.status(404).json({ message: "Lesson not found" });
            return;
        }
        yield Vocabulary_1.default.deleteMany({ lesson: id });
        yield Lesson_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Lesson deleted successfully" });
    }
    catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid lesson ID" });
        }
        else {
            res.status(500).json({ message: "Failed to delete lesson", error: error.message });
        }
    }
});
exports.deleteLesson = deleteLesson;
const getLessonsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessons = yield Lesson_1.default.find({}, "name lessonNumber").lean(); // Fetch lesson name and number
        res.status(200).json(lessons);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch lessons", error });
    }
});
exports.getLessonsForUser = getLessonsForUser;
