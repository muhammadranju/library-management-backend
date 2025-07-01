import { Request, Response } from "express";
import Book from "../../models/Book.model/Book.model";

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { title, author, isbn, copies, description, available, image } =
      req.body;
    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        author,
        isbn,
        description,
        copies,
        available,
        image,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Book update failed", success: false, error: error });
  }
};

export default updateBook;
