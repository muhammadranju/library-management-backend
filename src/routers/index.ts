import express from "express";

import bookRoutes from "./book.routes/book.routes";
import borrowRoutes from "./borrow.routes/borrow.routes";

const router = express.Router();

router.use("/books", bookRoutes);
router.use("/borrow", borrowRoutes);

export default router;
