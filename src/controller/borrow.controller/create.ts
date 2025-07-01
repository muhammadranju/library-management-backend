import { Request, Response } from "express";
import Borrow from "../../models/Borrow.model/Borrow.model";
import Book from "../../models/Book.model/Book.model";

const createBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const findBook = await Book.findById(book);

    // Handle the case where the book is not found
    if (!findBook) {
      res.status(404).json({
        message: "Borrow creation failed",
        success: false,
        error: "Book not found",
      });
      return;
    }

    // Check availability
    if (findBook.copies === 0 && !findBook.available) {
      res.status(400).json({
        message: "Borrow creation failed",
        success: false,
        error: "Book not available",
      });
      return;
    }

    // Deduct quantity
    if (findBook.copies < quantity) {
      res.status(400).json({
        message: "Borrow creation failed",
        success: false,
        error: `Not enough ${quantity} copies available`,
      });
      return;
    }

    findBook.copies -= quantity;

    await findBook.save();

    // Save borrow record
    const borrow = new Borrow({
      book,
      quantity,
      dueDate,
    });

    await Borrow.updateAvailability(book as string);
    await borrow.save();

    res.status(201).json({
      success: true,
      message: "Borrow created successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Borrow creation failed",
      success: false,
      error,
    });
  }
};

export default createBorrow;
