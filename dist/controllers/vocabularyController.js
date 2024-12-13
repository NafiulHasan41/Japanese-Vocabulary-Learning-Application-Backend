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
exports.getVocabulariesForLesson = exports.deleteVocabulary = exports.updateVocabulary = exports.getAllVocabularies = exports.createVocabulary = void 0;
const Vocabulary_1 = __importDefault(require("../models/Vocabulary"));
const Lesson_1 = __importDefault(require("../models/Lesson"));
const createVocabulary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { word, pronunciation, whenToSay, meaning, lessonNumber, adminEmail } = req.body;
    try {
        const lesson = yield Lesson_1.default.findOne({ lessonNumber });
        if (!lesson) {
            res.status(404).json({ message: `Lesson number ${lessonNumber} does not exist` });
            return;
        }
        const vocabulary = yield Vocabulary_1.default.create({
            word,
            pronunciation,
            whenToSay,
            meaning,
            lesson: lesson._id,
            adminEmail,
        });
        res.status(201).json(vocabulary);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create vocabulary", error });
    }
});
exports.createVocabulary = createVocabulary;
const getAllVocabularies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vocabularies = yield Vocabulary_1.default.find().populate("lesson", "lessonNumber name");
        res.status(200).json(vocabularies);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch vocabularies", error });
    }
});
exports.getAllVocabularies = getAllVocabularies;
const updateVocabulary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { word, pronunciation, whenToSay, meaning, lessonNumber } = req.body;
    try {
        const lesson = yield Lesson_1.default.findOne({ lessonNumber });
        if (!lesson) {
            res.status(404).json({ message: `Lesson number ${lessonNumber} does not exist` });
            return;
        }
        const updatedVocabulary = yield Vocabulary_1.default.findByIdAndUpdate(id, { word, pronunciation, whenToSay, meaning, lesson: lesson._id }, { new: true });
        if (!updatedVocabulary) {
            res.status(404).json({ message: "Vocabulary not found" });
            return;
        }
        res.status(200).json(updatedVocabulary);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to update vocabulary", error });
    }
});
exports.updateVocabulary = updateVocabulary;
const deleteVocabulary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Vocabulary_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ message: "Vocabulary not found" });
            return;
        }
        res.status(200).json({ message: "Vocabulary deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete vocabulary", error });
    }
});
exports.deleteVocabulary = deleteVocabulary;
const getVocabulariesForLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonNumber } = req.params;
    try {
        const lesson = yield Lesson_1.default.findOne({ lessonNumber });
        if (!lesson) {
            res.status(404).json({ message: `Lesson number ${lessonNumber} not found` });
            return;
        }
        const vocabularies = yield Vocabulary_1.default.find({ lesson: lesson._id });
        res.status(200).json(vocabularies);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch vocabularies", error });
    }
});
exports.getVocabulariesForLesson = getVocabulariesForLesson;
