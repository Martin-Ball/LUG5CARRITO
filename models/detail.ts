import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const detailSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }]
  });
  // exporto mi modelo, el cual me permite acceder a los metodos de la bd.
  export default model("Detail", detailSchema);