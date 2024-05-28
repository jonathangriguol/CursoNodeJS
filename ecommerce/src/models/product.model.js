import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "product";

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  title: String,
  description: String,
  price: Number,
  thumbnails: [String],
  stock: Number,
  category: String,
  status: Boolean,
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

export default Product;