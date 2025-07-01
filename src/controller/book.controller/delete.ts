import Book from "../../models/Book.model/Book.model";
import { Request, Response } from "express";

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      res
        .status(404)
        .json({ message: "Book not found", success: false, data: null });
      return;
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book deletion failed",
      error,
    });
  }
};

export default deleteBook;
