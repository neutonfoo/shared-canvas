const socket = io();
let ellipses = [];
socket.on("init", function (getEllipses) {
  ellipses = getEllipses;
});

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("sketch-container");

  background(100);
}

function draw() {
  for (const { x, y } of ellipses) {
    ellipse(x, y, 20, 20);
  }
}

function mouseClicked() {
  ellipse(mouseX, mouseY, 20, 20);
  socket.emit("draw", { x: mouseX, y: mouseY });
  // prevent default
  return false;
}

socket.on("draw", function ({ x, y }) {
  ellipse(x, y, 20, 20);
});
