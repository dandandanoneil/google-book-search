const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// DEFINE MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SERVE STATIC ASSETS
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// DEFINE API ROUTES 
// (within this file, if no API routes are hit, the React app is sent)
app.use(routes);

// CONNECT TO MONGODB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/googlebooks',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// START SERVER
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
