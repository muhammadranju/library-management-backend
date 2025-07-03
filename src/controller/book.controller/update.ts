import { Request, Response } from "express";
import Book from "../../models/Book.model/Book.model";

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { title, author, isbn, copies, description, available, image } =
      req.body;

    const book = await Book.findById({ _id: bookId });

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
      return;
    }
    (book.title = title ?? book?.title),
      (book.author = author ?? book?.author),
      (book.isbn = isbn ?? book?.isbn),
      (book.description = description ?? book?.description),
      (book.copies = copies ?? book?.copies),
      (book.available = copies > 0 ? true : false),
      (book.image = image ?? book?.image),
      await book.save();

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
