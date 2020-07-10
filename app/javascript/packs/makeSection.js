var index = 0;

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

    var day = document.createElement("div");
    var section = document.createElement("div");

    day.setAttribute("class", "surrounding-day");
    section.setAttribute("class", "section");

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
    container.setAttribute(
      "style",
      "height: " + image.height.toString() + "px;" //workaround for now, probably a more efficient way to do this
    );

    container.appendChild(day);
    container.appendChild(section);
    index++;
  });
};

window.makeDay = function (dayHeight, dayWidth, dayXOffset, dayYOffset) {
  window.addEventListener("load", (event) => {
    var image = document.getElementsByClassName("preview_image")[0];
    var container = document.getElementsByClassName("container")[index];

    var day = document.createElement("div");

    day.setAttribute("class", "solo-day");

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

    container.setAttribute(
      "style",
      "height: " + image.height.toString() + "px;" //workaround for now, probably a more efficient way to do this
    );

    container.appendChild(day);
    index++;
  });
};

window.makeDayIdUnique = function () {
  window.addEventListener("load", (event) => {
    var index = Date.now() + Math.round(Math.random() * 100000);
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

window.makeSectionIdUnique = function () {
  window.addEventListener("load", (event) => {
    var index = Date.now() + Math.round(Math.random() * 100000);
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
  });
};

window.resetIndex = function () {
  index = 0;
};
