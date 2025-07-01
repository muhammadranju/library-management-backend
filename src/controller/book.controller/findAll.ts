import Book from "../../models/Book.model/Book.model";
import { Request, Response } from "express";

const findAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "6",
      page = "1",
    } = req.query;

    const query: Record<string, any> = {};
    if (filter) {
      query.genre = filter;
    }

    const sortField = sortBy as string;
    const sortOrder = sort === "desc" ? -1 : 1;
    const limitNumber = parseInt(limit as string, 10);
    const pageNumber = parseInt(page as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const [books, total] = await Promise.all([
      Book.find(query)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limitNumber),
      Book.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      books,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Books retrieval failed",
      success: false,
      error,
    });
  }
};

export default findAllBooks;
