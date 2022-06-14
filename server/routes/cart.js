import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken";
import {
  addToCart,
  getAllCart,
  getUserCart,
  deleteCart,
  updateCart,
} from "../controllers/cart";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getAllCart);
router.get("/", verifyTokenAndAdmin, getUserCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);

export default router;
