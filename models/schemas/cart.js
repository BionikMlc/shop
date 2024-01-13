const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
