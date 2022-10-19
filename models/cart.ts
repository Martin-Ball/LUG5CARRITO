import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const cartSchema = new Schema({
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  status: String,
  total: Number
});
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default model("Cart", cartSchema);