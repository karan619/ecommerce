import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(
  "sk_test_51IrhLMJS1VrusMGYwzGjd52ELfkmPbaEugZ8CoW2NA4Az7tsPYPE5t2jhjW456VrXCPptlHDOBNQ1ibz3lNw5CUH00o8xuEjms"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log(stripeErr);
      } else {
        res.status(200).json(stripeRes);
        console.log(stripeRes);
      }
    }
  );
});

export default router;
