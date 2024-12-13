
import { Request, Response } from "express";

export const getTutorialVideos = async (req: Request, res: Response) => {
  const tutorialVideos = [
    { title: "Japanese Greetings", url: "https://www.youtube.com/embed/XYZ123" },
    { title: "Learn Hiragana in 30 minutes", url: "https://www.youtube.com/embed/ABC456" },
    { title: "Basic Japanese Phrases", url: "https://www.youtube.com/embed/DEF789" },
    { title: "Japanese Greetings", url: "https://www.youtube.com/embed/XYZ123" },
    { title: "Learn Hiragana in 30 minutes", url: "https://www.youtube.com/embed/ABC456" },
    { title: "Basic Japanese Phrases", url: "https://www.youtube.com/embed/DEF789" },
    { title: "Master Katakana", url: "https://www.youtube.com/embed/GHI012" },
    { title: "Common Japanese Expressions", url: "https://www.youtube.com/embed/JKL345" },
  ];
  res.status(200).json(tutorialVideos);
};
