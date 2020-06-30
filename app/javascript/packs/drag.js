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

        updateDayFormFields(target);
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
  ondrop: function (event) {
    // Add new hidden form field for this section if one does not exist
    if (event.relatedTarget.getAttribute("data-id") == null) {
      if (event.relatedTarget.classList.contains("day-drop")) {
        createDayFormFields(event.relatedTarget);
      } else {
        createSectionFormFields(event.relatedTarget, event.target);
      }
    } else {
      if (event.relatedTarget.classList.contains("day-drop")) {
        updateDayFormFields(event.relatedTarget);
      } else {
        updateSectionFormFields(event.relatedTarget);
      }
    }
  },
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
    if (event.relatedTarget.getAttribute("data-id") != null) {
      // deleteSectionFormFields(event.relatedTarget, event.target);
      if (event.target.getAttribute("data-id") != null) {
        deleteSectionFormFields(event.relatedTarget, event.target);
        // console.log("related", event.relatedTarget.getAttribute("data-id"));
        // console.log("target", event.target.getAttribute("data-id"));
      }
    }
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
  ondrop: function (event) {
    if (event.relatedTarget.getAttribute("data-id") == null) {
      if (event.relatedTarget.className == "day") {
        createDayFormFields(event.relatedTarget);
      } else {
        createSectionFormFields(event.relatedTarget, event.target);
      }
    } else {
      if (event.relatedTarget.classList.contains("day-drop")) {
        updateDayFormFields(event.relatedTarget);
      } else {
        createSectionFormFields(event.relatedTarget, event.target);
      }
    }
  },
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
    deleteFormFields(event.relatedTarget);
    event.target.parentNode.removeChild(event.relatedTarget);
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

const position = { x: 300, y: 300 };

// Creates new sections by dragging out of the sidebar
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

// Create form fields for a new section
window.createDayFormFields = function (box) {
  var time = Date.now();
  box.setAttribute("data-id", time);

  // Create input fields
  var xOffset = document.createElement("input");
  xOffset.setAttribute("type", "hidden");
  xOffset.setAttribute("name", "template[days_attributes][][x_offset]");
  var yOffset = document.createElement("input");
  yOffset.setAttribute("type", "hidden");
  yOffset.setAttribute("name", "template[days_attributes][][y_offset]");
  var width = document.createElement("input");
  width.setAttribute("type", "hidden");
  width.setAttribute("name", "template[days_attributes][][width]");
  var height = document.createElement("input");
  height.setAttribute("type", "hidden");
  height.setAttribute("name", "template[days_attributes][][height]");

  // Populate hidden fields
  var barRect = box.getBoundingClientRect();
  xOffset.setAttribute("value", barRect.left);
  yOffset.setAttribute("value", barRect.top);
  width.setAttribute("value", barRect.right - barRect.left);
  height.setAttribute("value", barRect.bottom - barRect.top);

  // Label hidden fields
  xOffset.setAttribute("class", "x_offset");
  yOffset.setAttribute("class", "y_offset");
  width.setAttribute("class", "width");
  height.setAttribute("class", "height");

  // Create div class to hold these
  var container = document.createElement("div");
  container.setAttribute("id", time);
  if (box.id == "day") {
    container.setAttribute("class", "day");
  } else {
    container.setAttribute("class", "section");
  }

  // Append hidden fields
  container.appendChild(xOffset);
  container.appendChild(yOffset);
  container.appendChild(width);
  container.appendChild(height);

  // Append container
  document.getElementById("form").appendChild(container);
};

// Update form fields for a section whose size or position has changed
window.updateDayFormFields = function (box) {
  var queryId = box.getAttribute("data-id");

  // Find input fields
  var fields = document.getElementById(queryId);
  var xOffset = fields.getElementsByClassName("x_offset")[0];
  var yOffset = fields.getElementsByClassName("y_offset")[0];
  var width = fields.getElementsByClassName("width")[0];
  var height = fields.getElementsByClassName("height")[0];

  // Update hidden fields
  var barRect = box.getBoundingClientRect();
  xOffset.setAttribute("value", barRect.left);
  yOffset.setAttribute("value", barRect.top);
  width.setAttribute("value", barRect.right - barRect.left);
  height.setAttribute("value", barRect.bottom - barRect.top);
};

window.createSectionFormFields = function (box, parent_box) {
  var time = Date.now();
  box.setAttribute("data-id", time);

  var queryId = parent_box.getAttribute("data-id");
  var formFields = document.getElementById(queryId);

  // Create input fields
  var xOffset = document.createElement("input");
  xOffset.setAttribute("type", "hidden");
  xOffset.setAttribute(
    "name",
    "template[days_attributes][][sections_attributes][][x_offset]"
  );
  var yOffset = document.createElement("input");
  yOffset.setAttribute("type", "hidden");
  yOffset.setAttribute(
    "name",
    "template[days_attributes][][sections_attributes][][y_offset]"
  );
  var width = document.createElement("input");
  width.setAttribute("type", "hidden");
  width.setAttribute(
    "name",
    "template[days_attributes][][sections_attributes][][width]"
  );
  var height = document.createElement("input");
  height.setAttribute("type", "hidden");
  height.setAttribute(
    "name",
    "template[days_attributes][][sections_attributes][][height]"
  );

  // Populate hidden fields
  var barRect = box.getBoundingClientRect();
  xOffset.setAttribute("value", barRect.left);
  yOffset.setAttribute("value", barRect.top);
  width.setAttribute("value", barRect.right - barRect.left);
  height.setAttribute("value", barRect.bottom - barRect.top);

  // Label hidden fields
  xOffset.setAttribute("class", "x_offset");
  yOffset.setAttribute("class", "y_offset");
  width.setAttribute("class", "width");
  height.setAttribute("class", "height");

  // Append hidden field container
  var container = document.createElement("div");
  container.setAttribute("id", box.getAttribute("data-id"));
  container.setAttribute("class", "section");

  container.appendChild(xOffset);
  container.appendChild(yOffset);
  container.appendChild(width);
  container.appendChild(height);

  formFields.appendChild(container);
};

// Delete form field elements when sections are removed
window.deleteFormFields = function (box) {
  var form = document.getElementById("form");
  var fieldId = box.getAttribute("data-id");
  var field = document.getElementById(fieldId);
  form.removeChild(field);
};

window.deleteSectionFormFields = function (box, parent_box) {
  var day = document.getElementById(parent_box.getAttribute("data-id"));
  var section = document.getElementById(box.getAttribute("data-id"));
  day.removeChild(section);
};
