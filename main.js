import "./style.css";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var circleRadius = 30;
var circleSpacing = 10;
var circleColors = ["red", "green", "blue", "yellow"];

// Loop through each circle
for (var i = 0; i < 4; i++) {
  // Calculate the circle's position
  var x = circleRadius + circleSpacing;
  var y = circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;

  // Draw the circle
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = circleColors[i];
  ctx.fill();

  ctx.beginPath();
  canvas_arrow(ctx, 750, y, 700, y);

  ctx.stroke();
}

function canvas_arrow(ctx, fromx, fromy, tox, toy) {
  var headLen = 5; // length of head in pixels
  var headHeight = 5;
  ctx.lineWidth = 5;
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox + headLen, toy);
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox + headLen, toy + headHeight);
  ctx.lineTo(tox + headLen, toy - headHeight);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();
}
