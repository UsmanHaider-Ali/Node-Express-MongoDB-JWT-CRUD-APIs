const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

module.exports = app;
