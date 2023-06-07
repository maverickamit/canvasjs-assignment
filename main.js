var canvas = document.getElementById("myCanvas");
var resetBtn = document.getElementById("resetButton");
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
  draw_circle(ctx, x, y, circleRadius, i);
  draw_arrow(ctx, fromx, y, tox, y);
}

function draw_circle(ctx, x, y, circleRadius, i) {
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

function clear_arrow(x, y) {
  ctx.clearRect(x, y - 15, 100, 30);
}
function clearCircle(x, y, circleRadius) {
  ctx.clearRect(
    x - circleRadius,
    y - circleRadius,
    circleRadius * 2,
    circleRadius * 2
  );
}
function clear_canvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function move_arrow(i) {
  var y = circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;
  if (tox < circleRadius * 2 + circleSpacing + 5) {
    cancelAnimationFrame(requestId);
  }
  if (isMoving && tox >= circleRadius * 2 + circleSpacing + 5) {
    tox -= moveDistance;
    fromx -= moveDistance;
    clear_arrow(tox, y);
    draw_arrow(ctx, fromx, y, tox, y);
  }
  var requestId = requestAnimationFrame(() => move_arrow(i));
  if (tox < circleRadius * 2 + circleSpacing + 5) {
    cancelAnimationFrame(requestId);
    stopMoving();
    circleColorChange(i);
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
function circleColorChange(i) {
  var x = circleRadius + circleSpacing;
  var y = circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;
  clearCircle(x, y, circleRadius);
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "grey";
  ctx.fill();
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
function handleReset(event) {
  clear_canvas();
  for (var i = 0; i < 4; i++) {
    fromx = 750;
    tox = 700;
    x = circleRadius + circleSpacing;
    y = circleRadius + circleSpacing + (circleRadius * 2 + circleSpacing) * i;
    draw_circle(ctx, x, y, circleRadius, i);
    draw_arrow(ctx, fromx, y, tox, y);
  }
}
canvas.addEventListener("click", handleClick);
resetBtn.addEventListener("click", handleReset);
