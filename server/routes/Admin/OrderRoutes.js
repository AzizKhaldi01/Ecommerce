const { insertOrder } = require("../../controllers/Admin/orderControler");

const express = require("express");
const router = express.Router();

router.post("/insertOrder", insertOrder);
module.exports = router;