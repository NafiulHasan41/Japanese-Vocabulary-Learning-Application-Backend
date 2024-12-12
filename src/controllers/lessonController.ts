import { Request, Response } from "express";
import Lesson from "../models/Lesson";
import Vocabulary from "../models/Vocabulary";


export const createLesson = async (req: Request, res: Response) => {
  const { name, lessonNumber } = req.body;

  try {
    const lesson = await Lesson.create({ name, lessonNumber });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: "Failed to create lesson", error });
  }
};

export const getAllLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find().lean();
    const enrichedLessons = await Promise.all(
      lessons.map(async (lesson) => {
        const vocabCount = await Vocabulary.countDocuments({ lesson: lesson._id });
        return { ...lesson, vocabularyCount: vocabCount };
      })
    );
    res.status(200).json(enrichedLessons);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lessons", error });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, lessonNumber } = req.body;

  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(id, { name, lessonNumber }, { new: true });
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ message: "Failed to update lesson", error });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Vocabulary.deleteMany({ lesson: id });
    await Lesson.findByIdAndDelete(id);
    res.status(200).json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lesson", error });
  }
};
