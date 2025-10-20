const express = require("express");
const app = express();
const port = 3000;
const user = require("./data/user");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// http://localhost:3000/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello!",
    timestamp: new Date().toISOString(),
    status: "success",
  });
});

// http://localhost:3000/user
app.get("/user", (req, res) => {
  res.json({
    message: "User list",
    timestamp: new Date().toISOString(),
    status: "success",
    user: user,
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = user.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({
      message: "user no encontrado",
      timestamp: new Date().toISOString(),
      status: "error",
    });
  }
  res.json({
    message: "User encontrado",
    timestamp: new Date().toISOString(),
    status: "success",
    user: user,
  });
});

// create user
app.post("/user", (req, res) => {
  const { name, phone, email, address, age, photoUrl } = req.body;
  const user = {
    id: (user.length + 1).toString(),
    name,
    phone,
    email,
    address,
    age,
    photoUrl,
  };
  user.push(user);
  res.json({
    message: "user creado",
    timestamp: new Date().toISOString(),
    status: "success",
    user: user,
  });
});

// update user
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  const user = user.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({
      message: "user no encontrado",
      timestamp: new Date().toISOString(),
      status: "error",
    });
  }
  user.name = name;
  user.phone = phone;
  res.json({
    message: "user actualizado",
    timestamp: new Date().toISOString(),
    status: "success",
    user: user,
  });
});

app.listen(port, () => {
  console.log(`API running ${port}`);
});
