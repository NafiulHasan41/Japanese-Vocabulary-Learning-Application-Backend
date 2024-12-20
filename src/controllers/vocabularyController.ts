import { Request, Response } from "express";
import Vocabulary from "../models/Vocabulary";
import Lesson from "../models/Lesson";

export const createVocabulary = async (req: Request, res: Response): Promise<void> => {
  const { word, pronunciation, whenToSay, meaning, lessonNumber, adminEmail } = req.body;

  try {
    const lesson = await Lesson.findOne({ lessonNumber });
    if (!lesson) {
      res.status(404).json({ message: `Lesson number ${lessonNumber} does not exist` });
      return;
    }

    const vocabulary = await Vocabulary.create({
      word,
      pronunciation,
      whenToSay,
      meaning, 
      lesson: lesson._id,
      adminEmail,
    });

    res.status(201).json(vocabulary);
  } catch (error) {
    res.status(400).json({ message: "Failed to create vocabulary", error });
  }
};

export const getAllVocabularies = async (req: Request, res: Response): Promise<void> => {
  try {
    const vocabularies = await Vocabulary.find().populate("lesson", "lessonNumber name");
    res.status(200).json(vocabularies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vocabularies", error });
  }
};

export const updateVocabulary = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { word, pronunciation, whenToSay, meaning, lessonNumber } = req.body;

  try {
    const lesson = await Lesson.findOne({ lessonNumber });
    if (!lesson) {
      res.status(404).json({ message: `Lesson number ${lessonNumber} does not exist` });
      return;
    }

    const updatedVocabulary = await Vocabulary.findByIdAndUpdate(
      id,
      { word, pronunciation, whenToSay, meaning, lesson: lesson._id }, 
      { new: true }
    );

    if (!updatedVocabulary) {
      res.status(404).json({ message: "Vocabulary not found" });
      return;
    }

    res.status(200).json(updatedVocabulary);
  } catch (error) {
    res.status(400).json({ message: "Failed to update vocabulary", error });
  }
};

export const deleteVocabulary = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await Vocabulary.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Vocabulary not found" });
      return;
    }
    res.status(200).json({ message: "Vocabulary deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vocabulary", error });
  }
};
export const getVocabulariesForLesson = async (req: Request, res: Response) => {
    const { lessonNumber } = req.params;
  
    try {
      const lesson = await Lesson.findOne({ lessonNumber });
      if (!lesson) {
         res.status(404).json({ message: `Lesson number ${lessonNumber} not found` });
         return;
      }
  
      const vocabularies = await Vocabulary.find({ lesson: lesson._id });
      res.status(200).json(vocabularies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vocabularies", error });
    }
  };