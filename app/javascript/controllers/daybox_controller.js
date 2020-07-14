import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["output"];

  connect() {
    var dayHeight = this.data.get("height");
    var dayWidth = this.data.get("width");
    var dayYOffset = this.data.get("y-offset");
    var dayXOffset = this.data.get("x-offset");

    var image = document.getElementsByClassName("preview_image")[0];
    var container = this.outputTarget;

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
  }
}
