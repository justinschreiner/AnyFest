// Javascript to help the section settings page

var index = 0;

// Creates the boxes on the preview images to indicate which section is being edited
// Creates a green section inside a gray day
window.makeBoxes = function (
  dayHeight,
  dayWidth,
  dayXOffset,
  dayYOffset,
  sectionHeight,
  sectionWidth,
  sectionXOffset,
  sectionYOffset
) {
  window.addEventListener("load", (event) => {
    var image = document.getElementsByClassName("preview_image")[0];
    var container = document.getElementsByClassName("container")[index];

    // Make the divs that will be the boxes
    var day = document.createElement("div");
    var section = document.createElement("div");

    day.setAttribute("class", "surrounding-day");
    section.setAttribute("class", "section");

    // Make the boxes the right size based on their size in the db
    day.setAttribute(
      "style",
      "height: " +
        ((dayHeight * image.height) / 10000.0).toString() +
        "px; width: " +
        ((dayWidth * 100.0) / 10000.0).toString() +
        "%; margin-top: " +
        ((dayYOffset * image.height) / 10000.0).toString() +
        "px; margin-left: " +
        ((dayXOffset * 100.0) / 10000.0).toString() +
        "%; z-index: 1;"
    );
    section.setAttribute(
      "style",
      "height: " +
        ((sectionHeight * image.height) / 10000.0).toString() +
        "px; width: " +
        ((sectionWidth * 100.0) / 10000.0).toString() +
        "%; margin-top: " +
        ((sectionYOffset * image.height) / 10000.0).toString() +
        "px; margin-left: " +
        ((sectionXOffset * 100.0) / 10000.0).toString() +
        "%; z-index: 2;"
    );

    // Setting the size of the form container
    container.setAttribute(
      "style",
      "height: " + image.height.toString() + "px;" //workaround for now, probably a more efficient way to do this
    );

    // Append the new boxes to the image
    container.appendChild(day);
    container.appendChild(section);
    index++;
  });
};

// Creates the boxes on the preview images to indicate which day is being edited
// Creates a green day with no sections
window.makeDay = function (dayHeight, dayWidth, dayXOffset, dayYOffset) {
  window.addEventListener("load", (event) => {
    var image = document.getElementsByClassName("preview_image")[0];
    var container = document.getElementsByClassName("container")[index];

    // Create the div that will represent the day
    var day = document.createElement("div");

    day.setAttribute("class", "solo-day");

    // Make the day box the right size based off of the sizes in the db
    day.setAttribute(
      "style",
      "height: " +
        ((dayHeight * image.height) / 10000.0).toString() +
        "px; width: " +
        ((dayWidth * 100.0) / 10000.0).toString() +
        "%; margin-top: " +
        ((dayYOffset * image.height) / 10000.0).toString() +
        "px; margin-left: " +
        ((dayXOffset * 100.0) / 10000.0).toString() +
        "%; z-index: 1;"
    );

    // Adjust the container for the form
    container.setAttribute(
      "style",
      "height: " + image.height.toString() + "px;" //workaround for now, probably a more efficient way to do this
    );

    // Append the day box to the image
    container.appendChild(day);
    index++;
  });
};

// Make the accordion actions reference unique day values
// Ensures the right form section is expanding/collapsing
window.makeDayIdUnique = function () {
  window.addEventListener("load", (event) => {
    // Create a unique index for this day
    var index = Date.now() + Math.round(Math.random() * 100000);

    // Add this index to identifying attributes of this accordion
    var accordionContainer = document.getElementById("accordionDay");
    accordionContainer.setAttribute("id", "accordionDay" + index.toString());

    var dayHeading = document.getElementById("dayHeading");
    dayHeading.setAttribute("id", "dayHeading" + index.toString());

    var headerContent = document.getElementById("dayAccordionHeader");
    headerContent.setAttribute("id", "dayAccordionHeader" + index.toString());
    headerContent.setAttribute(
      "aria-controls",
      "collapseDay" + index.toString()
    );
    headerContent.setAttribute("href", "#collapseDay" + index.toString());

    var content = document.getElementById("collapseDay");
    content.setAttribute("id", "collapseDay" + index.toString());
    content.setAttribute("aria-labelledby", "dayHeading" + index.toString());
    content.setAttribute("data-parent", "#accordionDay" + index.toString());

    var button = document.getElementById("innerDayCollapse");
    button.setAttribute("aria-controls", "collapseDay" + index.toString());
    button.setAttribute("href", "#collapseDay" + index.toString());
    button.setAttribute("id", "innerDayCollapse" + index.toString());
  });
};

// Make the accordion actions reference unique day values
// Ensures the right form section is expanding/collapsing
window.makeSectionIdUnique = function () {
  window.addEventListener("load", (event) => {
    // Create a unique index for this section
    var index = Date.now() + Math.round(Math.random() * 100000);

    // Add this index to identifying attributes of this accordion
    var accordionContainer = document.getElementById("accordionSection");
    accordionContainer.setAttribute(
      "id",
      "accordionSection" + index.toString()
    );

    var sectionHeading = document.getElementById("sectionHeading");
    sectionHeading.setAttribute("id", "sectionHeading" + index.toString());

    var headerContent = document.getElementById("sectionAccordionHeader");
    headerContent.setAttribute(
      "id",
      "sectionAccordionHeader" + index.toString()
    );
    headerContent.setAttribute(
      "aria-controls",
      "collapseSection" + index.toString()
    );
    headerContent.setAttribute("href", "#collapseSection" + index.toString());

    var content = document.getElementById("collapseSection");
    content.setAttribute("id", "collapseSection" + index.toString());
    content.setAttribute(
      "aria-labelledby",
      "sectionHeading" + index.toString()
    );
    content.setAttribute("data-parent", "#accordionSection" + index.toString());

    var button = document.getElementById("innerSectionCollapse");
    button.setAttribute("aria-controls", "collapseSection" + index.toString());
    button.setAttribute("href", "#collapseSection" + index.toString());
    button.setAttribute("id", "innerSectionCollapse" + index.toString());

    // Give the 'add color' button inside of this accordion reference its own unique index
    var checkBox = document.getElementById("alternating-color");
    checkBox.setAttribute("data-id", (index + 5).toString());

    var colorContent = document.getElementById("colors");
    colorContent.setAttribute("id", (index + 5).toString());
  });
};

// Add '[]' to the end of the 'name' attribute for text color fields
// This allows rails to accept multiple inputs for color fields
window.prepColorFields = function () {
  var colorFieldCount = document.getElementsByClassName("text-color").length;
  for (i = 0; i < colorFieldCount; i++) {
    var tempColorField = document.getElementsByClassName("text-color")[i];
    var currentName = tempColorField.getAttribute("name");
    tempColorField.setAttribute("name", currentName + "[]");
  }
};

// Resets the global index variable
window.resetIndex = function () {
  index = 0;
};

// Expands and collapses the add color icon based on whether or not the alternating colors box is checked or not
window.collapseAddColor = function (self) {
  var id = self.getAttribute("data-id");
  var content = document.getElementById(id);
  if (content.classList.contains("show")) {
    content.classList.remove("show");
  } else {
    content.classList.add("show");
  }
};

window.justin = function () {
  console.log("justin");
};
