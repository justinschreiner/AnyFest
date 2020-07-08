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
    console.log(index);
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

window.resetIndex = function () {
  index = 0;
};
