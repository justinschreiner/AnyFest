import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["output"];

  connect() {
    var dayHeight = this.data.get("dayheight");
    var dayWidth = this.data.get("daywidth");
    var dayYOffset = this.data.get("day-y-offset");
    var dayXOffset = this.data.get("day-x-offset");

    var sectionHeight = this.data.get("sectionheight");
    var sectionWidth = this.data.get("sectionwidth");
    var sectionYOffset = this.data.get("section-y-offset");
    var sectionXOffset = this.data.get("section-x-offset");

    var image = document.getElementsByClassName("preview_image")[0];
    var container = this.outputTarget;

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
  }
}
