import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const comments = new Schema({
    author : {type:Schema.Types.ObjectId, ref:"User"},
    comments: String,
});
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default model("Comments", comments);