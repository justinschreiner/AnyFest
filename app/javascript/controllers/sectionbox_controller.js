import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["output"];

  connect() {
    this.element
      .getElementsByTagName("img")[0]
      .addEventListener("load", (e) => {
        // Make Boxes
        // Get data from view
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

        // Make Unique Id's for accordions
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
        headerContent.setAttribute(
          "href",
          "#collapseSection" + index.toString()
        );

        var content = document.getElementById("collapseSection");
        content.setAttribute("id", "collapseSection" + index.toString());
        content.setAttribute(
          "aria-labelledby",
          "sectionHeading" + index.toString()
        );
        content.setAttribute(
          "data-parent",
          "#accordionSection" + index.toString()
        );

        var button = document.getElementById("innerSectionCollapse");
        button.setAttribute(
          "aria-controls",
          "collapseSection" + index.toString()
        );
        button.setAttribute("href", "#collapseSection" + index.toString());
        button.setAttribute("id", "innerSectionCollapse" + index.toString());

        // Give the 'add color' button inside of this accordion reference its own unique index
        var checkBox = document.getElementById("alternating-color");
        checkBox.setAttribute("data-id", (index + 5).toString());

        var colorContent = document.getElementById("colors");
        colorContent.setAttribute("id", (index + 5).toString());

        // Add '[]' to the end of the 'name' attribute for text color fields
        // This allows rails to accept multiple inputs for color fields
        var colorFieldCount = document.getElementsByClassName("text-color")
          .length;
        for (var i = 0; i < colorFieldCount; i++) {
          var tempColorField = document.getElementsByClassName("text-color")[i];
          var currentName = tempColorField.getAttribute("name");
          if (
            currentName.substr(
              currentName.length - 2,
              currentName.length - 1
            ) != "[]"
          ) {
            tempColorField.setAttribute("name", currentName + "[]");
          }
        }
      });
  }
}
