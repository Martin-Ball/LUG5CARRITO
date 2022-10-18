import dotenv from "dotenv";
// carga las variables de entorno para poder leerlas accediendo a process.env["variable"]
dotenv.config();

import express, { Express } from "express";
import mongoose from "mongoose";
import apiRoutes from "./routes/api";

// inicializa la clase que nos permite crear el servidor.
const app: Express = express();

// procesa json para poder manejarlo como objeto.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Agrega una ruta a la cual se accede a traves de localhost:PORT/api
app.use("/api", apiRoutes);

// Levanta el server y escucha en el puerto que se guardo en la variable de entorno PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});

// conecta con la base de datos
connectToDb()
  // si la conexion es exitosa sale por then y se loguea el mensaje en la consola.
  .then(() => console.log("Database connected successfully"))
  // si hubo algun error al conectar a la bd, se loguea el mensaje en la consola.
  .catch((err) => console.log(err));

async function connectToDb() {
  // cheque si la variable de entorno esta definida.
  if (process.env.DB_CONNECTION_STRING) {
    // intenta conectar con la bd.
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } else {
    // en caso que la var no se haya cargado correctamente, loguea un mensaje en la consola.
    console.log("Connection string is missing");
  }
}
