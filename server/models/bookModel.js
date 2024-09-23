import mongoose from "mongoose";

// schema for the book collection

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timeStamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
