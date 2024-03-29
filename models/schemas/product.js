const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  hidden: Boolean, // Boolean is shorthand for {type: Boolean}
  description: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
