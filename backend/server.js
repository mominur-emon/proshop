const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

connectDB(); //connect to MongoDB

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
