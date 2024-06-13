const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


//env configure
dotenv.config();

//stripe cofig old
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//stripe cofig new1




//server setup
const app = express();
const port = 7000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

//database


//routing1

app.get("/", async (req, res) => res.send("This is Foooody site's backend"))


//routing2
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {name: product.dish},
      unit_amount: product.price * 100,
    },
    quantity: product.qnty,
  }));

  // const customer = await stripe.customers.create({
  //   name: "siva s",
  //   description: "test description",
  //   email: "sivanandparvathi@gmail.com",
  //   phone: "9840350329",
  //   address: {
  //     line1: "TNHB Apartment,sholinganallur",
  //     line2: "",
  //     city: "chennai",
  //     state: "Tamilnadu",
  //     postal_code: "600119",
  //     country: "india",
  //   },
  // });
  // const customerID = customer.id;

  const session = await stripe.checkout.sessions.create({
    //customer: customerID,
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"]
    },
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    
  },{
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  res.json({ id: session.id });
});



//server listerning
app.listen(port, () => {
  console.log(`Server Running on the port ${port}`);
});
