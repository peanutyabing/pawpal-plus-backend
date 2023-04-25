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

const authenticateToken = (req, res, next) => {
  // Request header will include: Bearer <long and encrypted token>
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

// importing Routers
const UserRouter = require("./routers/userRouter.js");
const AuthRouter = require("./routers/authRouter.js");
const PetRouter = require("./routers/petRouter.js");
const EventRouter = require("./routers/eventRouter.js");
const ReminderRouter = require("./routers/reminderRouter.js");
const PostRouter = require("./routers/postRouter.js");

// importing Controllers
const UserController = require("./controllers/userController.js");
const AuthController = require("./controllers/authController.js");
const PetController = require("./controllers/petController.js");
const EventController = require("./controllers/eventController.js");
const ReminderController = require("./controllers/reminderController.js");
const PostController = require("./controllers/postController.js");

// importing DB
const db = require("./db/models/index.js");
const { user, pet, event, posts, species, breed, category, subcategory } = db;

// initializing Controllers -> note the lowercase for the first word
const userController = new UserController(user);
const authController = new AuthController(user);
const petController = new PetController(pet, event, species, breed);
const eventController = new EventController(event, category, subcategory, pet);
const reminderController = new ReminderController(event, pet, subcategory);
const postController = new PostController(posts);

// inittializing Routers
const userRouter = new UserRouter(userController, authenticateToken).routes();
const authRouter = new AuthRouter(authController, authenticateToken).routes();
const petRouter = new PetRouter(petController, authenticateToken).routes();
const eventRouter = new EventRouter(
  eventController,
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
app.use("/my-reminders", reminderRouter);
app.use("/users/:userId/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
