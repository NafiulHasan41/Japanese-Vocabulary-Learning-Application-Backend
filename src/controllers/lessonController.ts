import { Request, Response } from "express";
import Lesson from "../models/Lesson";
import Vocabulary from "../models/Vocabulary";


export const createLesson = async (req: Request, res: Response) => {
    const { name, lessonNumber } = req.body;
  
    try {
      const lesson = await Lesson.create({ name, lessonNumber });
      res.status(201).json(lesson);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        
        const errors = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: "Validation error", errors });
      } else if (error.code === 11000) {
       
        const duplicateField = Object.keys(error.keyValue)[0];
        res.status(400).json({ 
          message: `Duplicate value for field: ${duplicateField}`, 
          field: duplicateField 
        });
      } else {
       
        res.status(500).json({ message: "Failed to create lesson", error: error.message });
      }
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

export const updateLesson = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, lessonNumber } = req.body;
  
    try {
      const updatedLesson = await Lesson.findByIdAndUpdate(
        id,
        { name, lessonNumber },
        { new: true, runValidators: true }
      );
  
      if (!updatedLesson) {
        res.status(404).json({ message: "Lesson not found" });
        return; 
      }
  
      res.status(200).json(updatedLesson);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: "Validation error", errors });
      } else if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        res.status(400).json({
          message: `Duplicate value for field: ${duplicateField}`,
          field: duplicateField,
        });
      } else if (error.name === 'CastError') {
        res.status(400).json({ message: "Invalid lesson ID" });
      } else {
        res.status(500).json({ message: "Failed to update lesson", error: error.message });
      }
    }
  };

  export const deleteLesson = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const lesson = await Lesson.findById(id);
  
      if (!lesson) {
        res.status(404).json({ message: "Lesson not found" });
        return; 
      }
  
      await Vocabulary.deleteMany({ lesson: id });
      await Lesson.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error: any) {
      if (error.name === 'CastError') {
        res.status(400).json({ message: "Invalid lesson ID" });
      } else {
        res.status(500).json({ message: "Failed to delete lesson", error: error.message });
      }
    }
  };
  
  
