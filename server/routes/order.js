import express from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrder,
  getIncome,
} from "../controllers/order";

const router = express.Router();

router.post("/create-order", createOrder);
router.put("/update-order/:id", updateOrder);
router.delete("/delete-order/:id", deleteOrder);
router.get("/find/:userId", getUserOrder);
router.get("/", getAllOrder);
router.get("/income", getIncome);

export default router;
