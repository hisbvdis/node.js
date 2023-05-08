// ===========================================================================
// 1. IMPORTS
// ===========================================================================
// 1.1. Express
import express from "express";
// 1.2. Middlewares
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";
import errorMiddleware from "./middleware/error";
// 1.3. Routes
import usersRouter from "./routes/usersRouter";


// ===========================================================================
// 2. DATABASE
// ===========================================================================
let userList = [
  {id: 0, name: "Vasya"},
  {id: 1, name: "Petya"},
  {id: 2, name: "Tolya"},
]

class User {
  constructor(name, age) {
    this.id = userList.at(-1).id + 1 || 0;
    this.name = name;
    this.age = age;
  }
}



// ===========================================================================
// 3. EXPRESS APPLICATION
// ===========================================================================
// 3.1. Create express app
const app = express();

// 3.2. Middlewares
app.use(cors());
app.use(bodyParser.json());                       // application/json
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(loggerMiddleware);

// 3.3. Other
const upload = multer();



// ===========================================================================
// 4. ROUTING
// ===========================================================================
// LOGIN
app.post("/api/user/login", (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
})


// GET ALL USERS
app.use("/api/users/", usersRouter);


// GET USER
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userList.find((user) => user.id === id);

  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404);
    res.json("User not found");
  }
})


// ADD USER
app.post("/api/users/", (req, res) => {
  const { name } = req.body;
  const newUser = new User(name);
  userList.push(newUser);
  
  res.status(201);
  res.json(newUser);
})


// EDIT USER
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userList.find((user) => user.id === id);

  if (user !== undefined) {
    const name = req.body.name || user.name;
    const newUser = { ...user, name };
    userList = userList.map((user) => (user.id === id ? newUser : user));
    res.json(newUser);
  } else {
    res.status(404);
    res.json("User not found");
  }
})


// DELETE USER
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userList.find((user) => user.id === id);

  if (user !== undefined) {
    userList.splice(id, 1);
    res.send("OK");
  } else {
    res.status(404);
    res.json("User not found");
  }
})
