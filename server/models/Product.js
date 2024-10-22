const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  key: { type: String, required: true },   
  value: { type: String, required: true }  
});

const variantSchema = new mongoose.Schema({
    title: { type: String, required: true },   
    attributes: [attributeSchema],  
    image: [{ type: String }],  
    quantity: { type: Number, required: true },  
    price: { type: Number, required: true }  
  });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },   
  description: { type: String, required: true },   
  price: { type: Number, required: true },  
  category: { type: String, required: true },   
  rating: { type: Number, default: 0 },  
  sold: { type: Number, default: 0 },   
  stock: { type: Number, required: true },   
  variants: [variantSchema],  
});

module.exports = mongoose.model('Product', productSchema);
