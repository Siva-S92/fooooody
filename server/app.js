const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OyuooSDWWAfZmz9Mvg8fjGKXw5w6K8Ac0wzGajp7oRo6P51v29dseT3feZr2MXIyNajMIrKqtAcZZ40jQGr7goS00qoJyEjTI"
);

//server setup
const app = express();
const port = 7000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

//database

//routing
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.dish,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qnty,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  res.json({ id: session.id });
});

//server listerning
app.listen(port, () => {
  console.log(`Server Running on the port ${port}`);
});
