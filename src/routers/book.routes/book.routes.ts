import express from "express";
import findAllBooks from "../../controller/book.controller/findAll";
import createBook from "../../controller/book.controller/create";
import updateBook from "../../controller/book.controller/update";
import deleteBook from "../../controller/book.controller/delete";
import findSingleBook from "../../controller/book.controller/findSingle";
const router = express.Router();

router.route("/").get(findAllBooks);
router.route("/:bookId").get(findSingleBook);
router.route("/").post(createBook);
router.route("/:bookId").put(updateBook);
router.route("/:bookId").delete(deleteBook);

export default router;
