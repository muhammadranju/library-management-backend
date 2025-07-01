import express from "express";
import createBorrow from "../../controller/borrow.controller/create";
import findAllBorrows from "../../controller/borrow.controller/findAll";
const router = express.Router();

router.route("/").get(findAllBorrows);
router.route("/").post(createBorrow);

export default router;
