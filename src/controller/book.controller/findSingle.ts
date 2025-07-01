import { Request, Response } from "express";
import Book from "../../models/Book.model/Book.model";

export const findSingleBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById({ _id: bookId });

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book retrieval failed",
      error,
    });
  }
};

export default findSingleBook;
