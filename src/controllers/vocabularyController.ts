import { Request, Response } from "express";
import Vocabulary from "../models/Vocabulary";
import Lesson from "../models/Lesson";

export const createVocabulary = async (req: Request, res: Response) => {
    const { word, pronunciation, whenToSay, lessonNumber, adminEmail } = req.body;
  
    try {
    
      const lesson = await Lesson.findOne({ lessonNumber });
      if (!lesson) {
        return res.status(404).json({ message: `Lesson number ${lessonNumber} does not exist` });
      }
  
      
      const vocabulary = await Vocabulary.create({
        word,
        pronunciation,
        whenToSay,
        lesson: lesson?._id, 
        adminEmail,
      });
  
      res.status(201).json(vocabulary);
    } catch (error) {
      res.status(400).json({ message: "Failed to create vocabulary", error });
    }
  };

  export const getAllVocabularies = async (req: Request, res: Response) => {
    try {
      const vocabularies = await Vocabulary.find().populate("lesson", "lessonNumber name");
      res.status(200).json(vocabularies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vocabularies", error });
    }
  };

  export const updateVocabulary = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { word, pronunciation, whenToSay, lessonNumber } = req.body;
  
    try {
     
      const lesson = await Lesson.findOne({ lessonNumber });
      if (!lesson) {
        return res.status(404).json({ message: `Lesson number ${lessonNumber} does not exist` });
      }
  
     
      const updatedVocabulary = await Vocabulary.findByIdAndUpdate(
        id,
        { word, pronunciation, whenToSay, lesson: lesson._id },
        { new: true }
      );
  
      res.status(200).json(updatedVocabulary);
    } catch (error) {
      res.status(400).json({ message: "Failed to update vocabulary", error });
    }
  };
  

export const deleteVocabulary = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Vocabulary.findByIdAndDelete(id);
    res.status(200).json({ message: "Vocabulary deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vocabulary", error });
  }
};
