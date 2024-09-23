import express from "express";
const router = express.Router();
import { Book } from "../models/bookModel.js";

// create a new book route
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({
        message: "send all required fields: title, author and publish year",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// fetch all books route
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// fetch one book by id route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      book,
    });
  } catch (error) {
    res.status(500).send({ message: "book not found" });
  }
});

// update a book by id route
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({
        message: "send all required fields: title, author and publish year",
      });
    }
    const { id } = req.params;
    const response = await Book.findByIdAndUpdate(id, req.body);
    if (!response) {
      return res.status(500).send({
        message: "send all required fields: title, author and publish year",
      });
    }
    return res.status(200).send({
      message: "book updated successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete a book by id route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Book.findByIdAndDelete(id);
    if (!response) {
      return res.status(500).send({
        message: "book not found",
      });
    }
    return res.status(200).send({
      message: "book deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
