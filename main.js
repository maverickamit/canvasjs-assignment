import "./style.css";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var circleRadius = 30;
var circleSpacing = 10;
var circleColors = ["red", "green", "blue", "yellow"];
var isMoving = false;
var fromx = 750;
var tox = 700;
var moveDistance = 5;

// Loop through each circle
for (var i = 0; i < 4; i++) {
  // Calculate the circle's position
  var x = circleRadius + circleSpacing;
  var y = circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;
  draw_circle(ctx, x, y, circleRadius);
  draw_arrow(ctx, fromx, y, tox, y);
}

function draw_circle(ctx, x, y, circleRadius) {
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = circleColors[i];
  ctx.fill();
}

function draw_arrow(ctx, fromx, fromy, tox, toy) {
  var headLen = 5; // length of head in pixels
  var headHeight = 5;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox + headLen, toy);
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox + headLen, toy + headHeight);
  ctx.lineTo(tox + headLen, toy - headHeight);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
}

function clearCanvas(x, y) {
  ctx.clearRect(x, y - 15, 100, 30);
}

function move_arrow(i) {
  console.log("ran");
  var y = circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;
  if (tox < circleRadius * 2 + circleSpacing + 5) {
    console.log(requestId);
    cancelAnimationFrame(requestId);
  }
  if (isMoving && tox >= circleRadius * 2 + circleSpacing + 5) {
    tox -= moveDistance;
    fromx -= moveDistance;
    clearCanvas(tox, y);
    draw_arrow(ctx, fromx, y, tox, y);
  }
  var requestId = requestAnimationFrame(() => move_arrow(i));
  if (tox < circleRadius * 2 + circleSpacing + 5) {
    cancelAnimationFrame(requestId);
    stopMoving();
  }
}
var arrowMovedStatus = {};
for (var i = 0; i < 4; i++) {
  arrowMovedStatus[i] = false;
}
function startMoving(i) {
  isMoving = true;
  move_arrow(i);
}

function stopMoving() {
  isMoving = false;
}
function handleClick(event) {
  //reset starting point of x cordinates after animation ends
  if (!isMoving) {
    tox = 700;
    fromx = 750;
  }

  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  for (var i = 0; i < 4; i++) {
    var y =
      circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;
    const dx = x - clickX;
    const dy = y - clickY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    //Only moves one arrows at a time
    if (distance <= circleRadius && !arrowMovedStatus[i] && !isMoving) {
      arrowMovedStatus[i] = true;
      startMoving(i);
    }
  }
}
canvas.addEventListener("click", handleClick);
