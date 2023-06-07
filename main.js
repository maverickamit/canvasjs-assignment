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

function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
}
