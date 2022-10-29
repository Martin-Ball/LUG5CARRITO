import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const detailSchema = new Schema({
    desc: String,
    stock: Number,
    provider: { type: Schema.Types.ObjectId, ref: "Provider" },
  });
  // exporto mi modelo, el cual me permite acceder a los metodos de la bd.
  export default model("Detail", detailSchema);