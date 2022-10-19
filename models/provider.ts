import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const providerSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  address: String,
  email: String,
});
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default model("Provider", providerSchema);