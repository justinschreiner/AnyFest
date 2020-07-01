import interact from "interactjs";

window.addEventListener("DOMContentLoaded", (event) => {
  const primaryColor = getAverageRGB(
    document.getElementsByTagName("img")[0]
  )[0];
  const secondaryColor = getAverageRGB(
    document.getElementsByTagName("img")[0]
  )[1];

  // Allows boxes to be dragged
  window.dragMoveListener = function (event) {
    var target, x, y;
    target = event.target;
    x =
      (parseFloat(target.getAttribute("data-x")) || position.x || 0) + event.dx;
    y =
      (parseFloat(target.getAttribute("data-y")) || position.y || 0) + event.dy;
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";
    target.setAttribute("data-x", x);
    return target.setAttribute("data-y", y);
  };

  // Allows boxes to be resized

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
          event.target.style.padding = "0";

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
        interact.modifiers.restrict({
          restriction: document.querySelector("img"),
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 70, height: 30 },
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
          restriction: document.querySelector("img"),
          endOnly: true,
        }),
      ],
    });

  // Creates new sections or days by dragging out of the sidebar

  interact(".item")
    .draggable({
      inertia: true,
      autoScroll: true,
      manualStart: true,
      modifiers: [
        interact.modifiers.restrict({
          restriction: document.querySelector("img"),
          endOnly: true,
        }),
      ],
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
        element.style.border = "2px solid" + primaryColor;

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

  // Template image dropzone
  interact(".dropzone").dropzone({
    accept: ".drag-drop",
    overlap: 0.75,

    // listen for drop related events:
    ondropactivate: function (event) {},
    ondragenter: function (event) {},
    ondragleave: function (event) {},
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
          createSectionFormFields(event.relatedTarget, event.target);
        }
      }
    },
    ondropdeactivate: function (event) {},
  });

  // Day dropzone for sections
  interact("#day").dropzone({
    accept: ".section-drag",
    overlap: 0.75,

    // listen for drop related events:
    ondropactivate: function (event) {
      if (event.relatedTarget.getAttribute("data-id") != null) {
        if (event.target.getAttribute("data-id") != null) {
          deleteSectionFormFields(event.relatedTarget, event.target);
        }
      }
    },
    ondragenter: function (event) {
      // feedback the possibility of a drop
      event.target.style.border = "2px solid " + secondaryColor;
      event.relatedTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.style.border = "2px solid " + primaryColor;
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
      event.target.style.border = "2px solid " + primaryColor;
      event.relatedTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    },
  });

  // Trashcan dropzone
  interact("#trash").dropzone({
    accept: ".drag-drop",
    overlap: 0.1,

    // listen for drop related events:
    ondropactivate: function (event) {},
    ondragenter: function (event) {
      event.relatedTarget.style.backgroundColor = "rgba(200, 0, 0, 0.7)";
    },
    ondragleave: function (event) {
      // remove the drop feedback style, if mouse is up it means user dropped element in trash
      event.relatedTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      if (mouseDown == 0) {
        event.target.parentNode.removeChild(event.relatedTarget);
        if (event.relatedTarget.classList.contains("day")) {
          deleteFormFields(event.relatedTarget);
        } else {
          deleteSectionWithoutDay(event.relatedTarget);
        }
      }
    },
    ondrop: function (event) {},
    ondropdeactivate: function (event) {},
  });

  const position = { x: 300, y: 300 };

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

    // Prepare variables for setting height and width
    var barRect = box.getBoundingClientRect();
    var image = document.getElementsByTagName("img")[0];
    var imageRect = image.getBoundingClientRect();
    var imageWidth = imageRect.right - imageRect.left;
    var imageHeight = imageRect.bottom - imageRect.top;

    // Populate hidden fields as a percentage of the image
    xOffset.setAttribute("value", (barRect.left - imageRect.left) / imageWidth);
    yOffset.setAttribute("value", (barRect.top - imageRect.top) / imageHeight);
    width.setAttribute("value", (barRect.right - barRect.left) / imageWidth);
    height.setAttribute("value", (barRect.bottom - barRect.top) / imageHeight);

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

  // Creates hidden form fields for sections inside of days
  window.createSectionFormFields = function (box, parent_box) {
    var time = Date.now();
    box.setAttribute("data-id", time);

    var queryId = parent_box.getAttribute("data-id");
    if (queryId == null) {
      queryId = "form";
    }
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

    // Prepare variables for setting height and width
    var barRect = box.getBoundingClientRect();
    var image = document.getElementsByTagName("img")[0];
    var imageRect = image.getBoundingClientRect();
    var imageWidth = imageRect.right - imageRect.left;
    var imageHeight = imageRect.bottom - imageRect.top;

    // Populate hidden fields as a percentage of the image
    xOffset.setAttribute("value", (barRect.left - imageRect.left) / imageWidth);
    yOffset.setAttribute("value", (barRect.top - imageRect.top) / imageHeight);
    width.setAttribute("value", (barRect.right - barRect.left) / imageWidth);
    height.setAttribute("value", (barRect.bottom - barRect.top) / imageHeight);

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

  // Update form fields for a section whose size or position has changed
  window.updateDayFormFields = function (box) {
    var queryId = box.getAttribute("data-id");

    // Find input fields
    var fields = document.getElementById(queryId);
    var xOffset = fields.getElementsByClassName("x_offset")[0];
    var yOffset = fields.getElementsByClassName("y_offset")[0];
    var width = fields.getElementsByClassName("width")[0];
    var height = fields.getElementsByClassName("height")[0];

    // Prepare variables for setting height and width
    var barRect = box.getBoundingClientRect();
    var image = document.getElementsByTagName("img")[0];
    var imageRect = image.getBoundingClientRect();
    var imageWidth = imageRect.right - imageRect.left;
    var imageHeight = imageRect.bottom - imageRect.top;

    // Populate hidden fields as a percentage of the image
    xOffset.setAttribute("value", (barRect.left - imageRect.left) / imageWidth);
    yOffset.setAttribute("value", (barRect.top - imageRect.top) / imageHeight);
    width.setAttribute("value", (barRect.right - barRect.left) / imageWidth);
    height.setAttribute("value", (barRect.bottom - barRect.top) / imageHeight);
  };

  window.updateSectionParent = function (box, parent_box) {
    parent_box.appendChild(box);
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
    if (day.contains(section)) {
      day.removeChild(section);
    }
  };

  window.deleteSectionWithoutDay = function (box) {
    var section = document.getElementById(box.getAttribute("data-id"));
    var day = document.getElementById("form");
    if (day.contains(section)) {
      day.removeChild(section);
    }
  };

  var mouseDown = 0;
  window.onmousedown = function () {
    ++mouseDown;
  };
  window.onmouseup = function () {
    --mouseDown;
  };

  function getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement("canvas"),
      context = canvas.getContext && canvas.getContext("2d"),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    var rgbString =
      rgb.r.toString() + "," + rgb.g.toString() + "," + rgb.b.toString();

    return lightOrDark(rgbString);
  }

  function lightOrDark(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If RGB --> store the red, green, blue values in separate variables
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      // If hex --> Convert it to RGB: http://gist.github.com/983661
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return generateColors(0); // the color is light
    } else {
      return generateColors(1); // the color is dark
    }
  }

  function generateColors(b) {
    if (b == 0) {
      return ["#000", "#fff"];
    } else {
      return ["#fff", "#000"];
    }
  }
});
