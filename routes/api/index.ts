import { Router } from "express";
import cartRoutes from "./cart";
import providerRoutes from "./providers";

const router = Router();
// todas las rutas que lleguen a /api/blogs, ejecutaran lo que se exporto de blogRoutes
router.use("/cart", cartRoutes);
router.use("/provider", providerRoutes);

// se pueden agregar todas las rutas que se necesiten, estaran dentro de /api

export default router;
