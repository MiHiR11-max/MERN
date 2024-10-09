const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 }
  });

const schema = new mongoose.Schema({
    id:Number,
    customerName: String,
    customerAddress : String,
    total: Number,
    date:String,
    item:[itemSchema]
})  





module.exports = mongoose.model("student", schema);