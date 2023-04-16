const cors = require("cors");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing Routers
const PetRouter = require("./routers/petRouter.js");

// importing Controllers
const PetController = require("./controllers/petController.js");

// importing DB
const db = require("./db/models/index.js");
const { pet, event, species, breed } = db;

// initializing Controllers -> note the lowercase for the first word
const petController = new PetController(pet, event, species, breed);

// inittializing Routers
const petRouter = new PetRouter(petController).routes();

// using the routers
app.use("/users/:userId/pets", petRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
