const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const canvas = [];

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.emit("init", canvas);

  socket.on("draw", shape => {
    canvas.push(shape);
    io.emit("updateCanvas", canvas);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
