const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//mongo
const connectDB = require('./config/db')
connectDB();

//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admins', require('./routes/adminRoutes'))
app.use('/api/bookings', require('./routes/userBookingRoutes'))



//heroku links
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5003;

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
