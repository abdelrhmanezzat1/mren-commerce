const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./Routes/auth");
const user = require("./Routes/user");
const prodect = require("./Routes/prodect");
const Cart = require("./Routes/cart");
const Order = require("./Routes/order");
const stripe = require("./Routes/Stripe");
const path = require("path")
const Port = 9000

require("dotenv").config();
app.use(cors());
app.use(express.json());
mongoose
    .connect(process.env.MY_URL)
    .then(() => console.log("DB is conect Done.."))
    .catch((err) => console.log(err));
app.use("/api/", auth);
app.use("/api/users", user);
app.use("/api/prodects", prodect);
app.use("/api/cart", Cart);
app.use("/api/order", Order);
app.use("/api/check", stripe);
app.use(express.static(path.resolve(__dirname, "./client/build")))
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "./client/build", "index.html")))

app.listen(process.env.PORT || Port, () => console.log(`server running in port ${Port}...`))