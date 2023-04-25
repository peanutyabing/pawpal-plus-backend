const cors = require("cors");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//socket io
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Add this before the app.get() block
let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

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
const { pet, event, post, species, breed, category, subcategory, comment } = db;

// initializing Controllers -> note the lowercase for the first word
const petController = new PetController(pet, event, species, breed);
const eventController = new EventController(event, category, subcategory);
const postController = new PostController(post, comment);

// inittializing Routers
const petRouter = new PetRouter(petController).routes();
const eventRouter = new EventRouter(eventController).routes();
const postRouter = new PostRouter(postController).routes();

// using the routers
app.use("/users/:userId/pets", petRouter);
app.use("/users/:userId/pets/:petId/events", eventRouter);
app.use("/users/:userId/posts", postRouter);

/* app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
}); */
