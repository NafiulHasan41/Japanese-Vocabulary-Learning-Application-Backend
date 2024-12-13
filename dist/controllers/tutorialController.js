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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTutorialVideos = void 0;
const getTutorialVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorialVideos = [
        { title: "N5 Vocabulary Lesson-1", url: "https://www.youtube.com/embed/BgzBHTgp4K0?si=mGxF8iX6yPL9BcMF" },
        { title: "Learn Hiragana in 30 minutes", url: "https://www.youtube.com/embed/rGJEV1eS2mg?si=-a4uEk1wbTC5ZVnt" },
        { title: "Basic Japanese Phrases", url: "https://www.youtube.com/embed/vuly0ZEo6wo?si=Ow5f5-MWG13WB12E" },
        { title: "Japanese Greetings", url: "https://www.youtube.com/embed/81c5U9WKET0?si=YhLG9FBZcuvYD1lC" },
        { title: "Learn Hiragana in 30 minutes", url: "https://www.youtube.com/embed/DCxPOpV8Yaw?si=WwGI5Z-iIvyMz_De" },
        { title: "Basic Japanese Phrases", url: "https://www.youtube.com/embed/M5AqMcOyWdg?si=x-AJmYWAHnUUZjHR" },
        { title: "Master Katakana", url: "https://www.youtube.com/embed/pi40ibPeD64?si=tq_gTxiBS0J6XX6Y" },
        { title: "Common Japanese Expressions", url: "https://www.youtube.com/embed/ljrnyDhVsgs?si=7wDmYTR-CEohNadx" },
    ];
    res.status(200).json(tutorialVideos);
});
exports.getTutorialVideos = getTutorialVideos;
