import { Request, Response } from "express";
import Borrow from "../../models/Borrow.model/Borrow.model";

const findAllBorrows = async (req: Request, res: Response) => {
  try {
    const borrows = await Borrow.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrows summery retrieved successfully",
      data: borrows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Borrows retrieval failed",
      success: false,
      error: error,
    });
  }
};

export default findAllBorrows;
