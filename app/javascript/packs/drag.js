import interact from "interactjs";

var dragMoveListener;

dragMoveListener = function (event) {
  var target, x, y;
  target = event.target;
  x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";
  target.setAttribute("data-x", x);
  return target.setAttribute("data-y", y);
};

window.dragMoveListener = dragMoveListener;

interact('*[data-draggable="true"]').draggable({
  inertia: true,
  autoScroll: true,
  onmove: dragMoveListener,
});
