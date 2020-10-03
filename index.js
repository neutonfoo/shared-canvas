const express = require("express");
const app = express();
const port = 3000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const ellipses = [];

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.emit("init", ellipses);

  socket.on("draw", ({ x, y }) => {
    ellipses.push({ x, y });
    io.emit("draw", { x: x, y: y });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
