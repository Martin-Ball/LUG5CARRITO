import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const productSchema = new Schema({
  name: String,  
  price: Number,
  desc: String,
  stock: {type: Number, default: 0},
  provider: { type: Schema.Types.ObjectId, ref: "Provider" },
});
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default model("Product", productSchema);