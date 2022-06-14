import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import stripeRoute from "./routes/stripe";
import orderRoute from "./routes/order";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/order", orderRoute);

app.get("/test", (req, res) => {
  res.json("working");
});

const CONNECTION_URL =
  "mongodb+srv://ecommerce:123123123@eccom-mern.hrjjwlo.mongodb.net/?retryWrites=true&w=majority";

//const CONNECTION_URL =  "mongodb+srv://ecommerce:123123123@eccom-mern.hrjjwlo.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
