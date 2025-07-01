import { Schema, model } from "mongoose";
import { IBook } from "../../interface/interface";
import Borrow from "../Borrow.model/Borrow.model";

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    image: {
      type: String,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.post(
  ["deleteOne", "findOneAndDelete", "deleteMany"],
  async function (_doc, next) {
    await Borrow.deleteMany({ book: _doc._id });
    next();
  }
);

const Book = model<IBook>("Book", BookSchema);

export default Book;
