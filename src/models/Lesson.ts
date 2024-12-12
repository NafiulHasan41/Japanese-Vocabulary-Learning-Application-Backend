import mongoose, { Schema, Document } from "mongoose";

export interface ILesson extends Document {
  name: string;
  lessonNumber: number;
}

const LessonSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lessonNumber: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILesson>("Lesson", LessonSchema);
