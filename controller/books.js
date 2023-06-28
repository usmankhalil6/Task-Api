const router = require("express").Router();
const Books = require("../entity/books");
const { fetchResponse } = require("../service/pagination");
const { create } = require("../service/create");

router.get("/books", fetchResponse(Books));
router.post("/books", create(Books));

module.exports = router;
