const express = require('express');
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/itemController');
const router = express.Router();

router.route('/items')
  .get(getItems)
  .post(createItem);

router.route('/items/:id')
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
