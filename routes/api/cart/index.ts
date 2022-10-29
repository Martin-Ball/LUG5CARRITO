import { Router } from "express";
import { cartController } from '../../../controllers/cart';

// se instancia un nuevo router el cual se utilizara para nestear rutas.
const router = Router();
// cuando la url coincida con esta ruta, se ejecuta el codigo dentro de la funcion.
// en este caso la url deberia ser --> localhost:PORT/api/blogs/ con un metodo GET.
router.post("/newCart", cartController.newCart);

router.get("/getCart", cartController.getCart);

router.get("/getAllCarts", cartController.getAllCarts);

router.post("/addProduct", cartController.addProduct);

router.post("/deleteProduct", cartController.deleteProduct);

router.patch("/moreProduct", cartController.moreProduct);

router.patch("/lessProduct", cartController.lessProduct);

router.patch("/setAmount", cartController.setAmount);

router.post("/buyCart", cartController.buyCart)


// se exporta el router para poder enlazarlo con las rutas que estan dentro de /api.
export default router;
