import interact from "interactjs";

var dragMoveListener;

dragMoveListener = function (event) {
  var target, x, y;
  target = event.target;
  x = (parseFloat(target.getAttribute("data-x")) || position.x || 0) + event.dx;
  y = (parseFloat(target.getAttribute("data-y")) || position.y || 0) + event.dy;
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";
  target.setAttribute("data-x", x);
  return target.setAttribute("data-y", y);
};

window.dragMoveListener = dragMoveListener;

interact(".drag-drop")
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || position.x || 0;
        var y = parseFloat(target.getAttribute("data-y")) || position.y || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
        // target.textContent =
        //   Math.round(event.rect.width) +
        //   "\u00D7" +
        //   Math.round(event.rect.height);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        // outer: "parent",
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
    ],

    inertia: true,
  })
  .draggable({
    inertia: true,
    autoScroll: true,
    onmove: dragMoveListener,
    modifiers: [
      interact.modifiers.restrictRect({
        // restriction: "parent",
        endOnly: true,
      }),
    ],
  });

interact(".dropzone").dropzone({
  // only accept elements matching this CSS selector
  accept: ".drag-drop",
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
  },
  ondrop: function (event) {},
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

// Day dropzone
interact("#day").dropzone({
  // only accept elements matching this CSS selector
  accept: ".section-drag",
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.style.border = "2px solid #fff";
    draggableElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.style.border = "2px solid #000";
    event.relatedTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  },
  ondrop: function (event) {},
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.style.border = "2px solid #000";
    event.relatedTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  },
});

// Trashcan
interact("#trash").dropzone({
  // only accept elements matching this CSS selector
  accept: ".drag-drop",
  overlap: 0.01,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
    draggableElement.style.backgroundColor = "rgba(200, 0, 0, 0.7)";
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
    event.relatedTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  },
  ondrop: function (event) {
    event.target.parentNode.removeChild(event.relatedTarget);
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

const position = { x: 300, y: 300 };

interact(".item")
  .draggable({
    inertia: true,
    autoScroll: true,
    manualStart: true,
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  })
  .on("move", function (event) {
    const { currentTarget, interaction } = event;
    let element = currentTarget;

    // If we are dragging an item from the sidebar, its transform value will be ''
    // We need to clone it, and then start moving the clone
    if (
      interaction.pointerIsDown &&
      !interaction.interacting() &&
      currentTarget.style.transform === ""
    ) {
      element = currentTarget.cloneNode(true);

      // Add absolute positioning so that cloned object lives
      // right on top of the original object
      element.style.position = "absolute";
      element.style.left = 0;
      element.style.top = 0;
      element.className = "";
      element.classList.add("drag-drop");
      if (element.id == "day") {
        element.classList.add("dropzone");
        element.classList.add("day-drop");
      } else {
        element.classList.add("section-drag");
      }

      // Add the cloned object to the document
      const container = document.querySelector(".container");
      container && container.appendChild(element);

      const { offsetTop, offsetLeft } = currentTarget;
      position.x = offsetLeft;
      position.y = offsetTop;

      // If we are moving an already existing item, we need to make sure
      // the position object has the correct values before we start dragging it
    } else if (interaction.pointerIsDown && !interaction.interacting()) {
      const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
      const transform = regex.exec(currentTarget.style.transform);

      if (transform && transform.length > 1) {
        position.x = Number(transform[1]);
        position.y = Number(transform[2]);
      }
    }
    interaction.start({ name: "drag" }, event.interactable, element);
  });
