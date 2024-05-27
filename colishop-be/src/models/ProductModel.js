const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        id: {type:String, require: true, unique: true},
        name: {type: String, require: true},
        image: {type: String, require: true},
        type: {type: String, require: true},
        rating: {type: Number, require: true},
        description: {type: String, require: true},
        price: {type: Number, require: true},
        countInStock: {type: Number, require: true}
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;