import { Router } from "express";
import cartRoutes from "./cart";
import productRoutes from "./products";
import detailRoutes from "./detail";
import providerRoutes from "./provider";

const router = Router();
// todas las rutas que lleguen a /api/blogs, ejecutaran lo que se exporto de blogRoutes
router.use("/cart", cartRoutes);
router.use("/product", productRoutes);
router.use("/detail", detailRoutes);
router.use("/provider", providerRoutes);

// se pueden agregar todas las rutas que se necesiten, estaran dentro de /api

export default router;
