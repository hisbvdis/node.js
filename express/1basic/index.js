import express from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";



/* ======================================================================= */
/* 0. DATABASE */
/* ======================================================================= */
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



/* ======================================================================= */
/* 1. CREATE EXPRESS APPLICATION */
/* ======================================================================= */
const app = express();
const upload = multer();

// CORS
app.use(cors());

// BODY PARSING
app.use(bodyParser.json());                       // application/json
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(upload.array());                          // multipart/form-data
app.use(express.static('public'));                // multipart/form-data

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log( `Server is running on http://localhost:${PORT}/` )
});



/* ======================================================================= */
/* 2. ROUTING */
/* ======================================================================= */
// LOGIN
app.post("/api/user/login", (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
})


// GET ALL USERS
app.get("/api/users/", (req, res) => {
  res.json(userList);
})


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
