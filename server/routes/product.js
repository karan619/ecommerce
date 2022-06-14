import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
} from "../controllers/product";
const router = express.Router();

//Product
router.post("/add-product", createProduct);
router.get("/find/:id", getProductById);
router.get("/", getAllProducts);

export default router;
