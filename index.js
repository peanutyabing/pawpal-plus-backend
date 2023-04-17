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
const EventRouter = require("./routers/eventRouter.js");
const PostRouter = require("./routers/postRouter.js");

// importing Controllers
const PetController = require("./controllers/petController.js");
const EventController = require("./controllers/eventController.js");
const PostController = require("./controllers/postController.js");

// importing DB
const db = require("./db/models/index.js");
const { pet, event, posts, species, breed, category, subcategory } = db;

// initializing Controllers -> note the lowercase for the first word
const petController = new PetController(pet, event, species, breed);
const eventController = new EventController(event, category, subcategory);
const postController = new PostController(posts);

// inittializing Routers
const petRouter = new PetRouter(petController).routes();
const eventRouter = new EventRouter(eventController).routes();
const postRouter = new PostRouter(postController).routes();

// using the routers
app.use("/users/:userId/pets", petRouter);
app.use("/users/:userId/pets/:petId/events", eventRouter);
app.use("/users/:userId/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
