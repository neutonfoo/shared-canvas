const socket = io();
let canvas = [];
let backgroundColor = "#B8D8BA";
let strokeColor = "#FFF";

socket.on("init", syncedCanvas => {
  canvas = syncedCanvas;
});

socket.on("updateCanvas", syncedCanvas => {
  canvas = syncedCanvas;
});

function setup() {
  const canvas = createCanvas(900, 650);
  canvas.parent("sketch-container");

  background(backgroundColor);
  strokeColor = strokeColor;
  strokeWeight(4);
}

function draw() {
  stroke(strokeColor);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    socket.emit("draw", {
      shape: "line",
      color: strokeColor,
      x1: mouseX,
      y1: mouseY,
      x2: pmouseX,
      y2: pmouseY,
    });
  }

  for (const shape of canvas) {
    if (shape.shape === "line") {
      stroke(shape.color);
      line(shape.x1, shape.y1, shape.x2, shape.y2);
    }
  }
}

$(document).ready(function () {
  $(".color").on("click", function () {
    $(".color").removeClass("selected");
    strokeColor = $(this).css("background-color");
    $(this).addClass("selected");
  });
});
