import Book from "../../models/Book.model/Book.model";

import { Request, Response } from "express";

const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      isbn,
      genre,
      description,
      copies,
      available,
      image,
    } = req.body;
    const book = new Book({
      title,
      author,
      isbn,
      genre,
      description,
      copies,
      image,
      available,
    });
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book creation failed",
      success: false,
      error: error,
    });
  }
};

export default createBook;
