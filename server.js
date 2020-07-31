const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes");
const app = express();
const mongoConfig = require("./utils/mongoConfig");

const app = express();
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/lerndb";
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride("_method"));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(methodOverride("_method"));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes
app.use(routes);

// Connect to the Mongo DB
mongoose.Promise = global.Promise;
mongoose.connect(
<<<<<<< HEAD
  mongoConfig.mongoURI,
=======
  mongoURI,
>>>>>>> 453df02d3d8b8399f834dd9c1d2fb32d4bff1909
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) throw err;
  }
);

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// file upload error handling
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
