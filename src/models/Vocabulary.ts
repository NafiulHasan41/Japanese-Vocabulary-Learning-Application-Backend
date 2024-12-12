import mongoose, { Schema, Document } from "mongoose";

export interface IVocabulary extends Document {
  word: string;
  pronunciation: string;
  whenToSay: string;
  meaning: string; // New field
  lesson: mongoose.Schema.Types.ObjectId;
  adminEmail: string;
}

const VocabularySchema: Schema = new Schema(
  {
    word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    whenToSay: { type: String, required: true },
    meaning: { type: String, required: true }, // New field
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    adminEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVocabulary>("Vocabulary", VocabularySchema);