import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["output"];

  connect() {
    this.element
      .getElementsByTagName("img")[0]
      .addEventListener("load", (e) => {
        // Make Box
        // Get data from view
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

        // Create a unique index for this day
        var index = Date.now() + Math.round(Math.random() * 100000);

        // Make Id Unique for accordion
        // Add this index to identifying attributes of this accordion
        var accordionContainer = document.getElementById("accordionDay");
        accordionContainer.setAttribute(
          "id",
          "accordionDay" + index.toString()
        );

        var dayHeading = document.getElementById("dayHeading");
        dayHeading.setAttribute("id", "dayHeading" + index.toString());

        var headerContent = document.getElementById("dayAccordionHeader");
        headerContent.setAttribute(
          "id",
          "dayAccordionHeader" + index.toString()
        );
        headerContent.setAttribute(
          "aria-controls",
          "collapseDay" + index.toString()
        );
        headerContent.setAttribute("href", "#collapseDay" + index.toString());

        var content = document.getElementById("collapseDay");
        content.setAttribute("id", "collapseDay" + index.toString());
        content.setAttribute(
          "aria-labelledby",
          "dayHeading" + index.toString()
        );
        content.setAttribute("data-parent", "#accordionDay" + index.toString());

        var button = document.getElementById("innerDayCollapse");
        button.setAttribute("aria-controls", "collapseDay" + index.toString());
        button.setAttribute("href", "#collapseDay" + index.toString());
        button.setAttribute("id", "innerDayCollapse" + index.toString());
      });
  }
}
