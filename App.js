const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router/auth__route");
const app = express();

//middleware
app.use(express.json());

//db connection
mongoose
  .connect("mongodb://localhost/SharePoint", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((val) => console.log("Connected to DB..."))
  .catch((err) => console.log("Failed To Connect DB...", err));

// route
app.use("/api/user", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${port}`));
