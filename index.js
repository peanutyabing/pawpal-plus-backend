const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401).json({ success: false, msg: "missing token" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, msg: "invalid token" });
    }
    req.user = user;
    next();
  });
};

//socket io
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

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
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
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

// importing Routers
const UserRouter = require("./routers/userRouter.js");
const AuthRouter = require("./routers/authRouter.js");
const PetRouter = require("./routers/petRouter.js");
const EventRouter = require("./routers/eventRouter.js");
const CategoryRouter = require("./routers/categoryRouter.js");
const AnalyticsRouter = require("./routers/analyticsRouter.js");
const ReminderRouter = require("./routers/reminderRouter.js");
const PostRouter = require("./routers/postRouter.js");

// importing Controllers
const UserController = require("./controllers/userController.js");
const AuthController = require("./controllers/authController.js");
const PetController = require("./controllers/petController.js");
const EventController = require("./controllers/eventController.js");
const CategoryController = require("./controllers/categoryController.js");
const AnalyticsController = require("./controllers/analyticsController.js");
const ReminderController = require("./controllers/reminderController.js");
const PostController = require("./controllers/postController.js");

// importing DB
const db = require("./db/models/index.js");
const {
  user,
  pet,
  event,
  post,
  species,
  breed,
  category,
  subcategory,
  comment,
  posttopic,
  topic,
} = db;

// initializing Controllers -> note the lowercase for the first word
const userController = new UserController(user);
const authController = new AuthController(user);
const petController = new PetController(pet, event, species, breed);
const postController = new PostController(
  post,
  comment,
  posttopic,
  topic,
  user
);
const eventController = new EventController(event, category, subcategory, pet);
const categoryController = new CategoryController(category, subcategory);
const analyticsController = new AnalyticsController(
  event,
  category,
  subcategory,
  pet
);
const reminderController = new ReminderController(event, pet, subcategory);

// inittializing Routers
const userRouter = new UserRouter(userController, authenticateToken).routes();
const authRouter = new AuthRouter(authController, authenticateToken).routes();
const petRouter = new PetRouter(petController, authenticateToken).routes();
const eventRouter = new EventRouter(
  eventController,
  authenticateToken
).routes();
const categoryRouter = new CategoryRouter(categoryController).routes();
const analyticsRouter = new AnalyticsRouter(
  analyticsController,
  authenticateToken
).routes();
const reminderRouter = new ReminderRouter(
  reminderController,
  authenticateToken
).routes();
const postRouter = new PostRouter(postController).routes();

// using the routers
app.use("/user-profile", userRouter);
app.use("/auth", authRouter);
app.use("/my-pets", petRouter);
app.use("/my-pets/:petId/events", eventRouter);
app.use("/", categoryRouter);
app.use("/analytics/:petId", analyticsRouter);
app.use("/my-reminders", reminderRouter);
app.use("/users/:userId/posts", postRouter);

http.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
