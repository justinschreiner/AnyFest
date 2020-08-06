import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["output"];

  connect() {
    this.element
      .getElementsByClassName("preview_image")[0]
      .addEventListener("load", (e) => {
        // Make Boxes
        // Get data from view
        var dayHeight = this.data.get("day-height");
        var dayWidth = this.data.get("day-width");
        var dayYOffset = this.data.get("day-y-offset");
        var dayXOffset = this.data.get("day-x-offset");

        var sectionHeight = this.data.get("section-height");
        var sectionWidth = this.data.get("section-width");
        var sectionYOffset = this.data.get("section-y-offset");
        var sectionXOffset = this.data.get("section-x-offset");

        var image = document.getElementsByClassName("preview_image")[0];
        var container = this.outputTarget;

        // Make the divs that will be the boxes
        var day = document.createElement("div");
        var section = document.createElement("div");

        day.classList.add("surrounding-day");
        section.classList.add("section");

        // Make the boxes the right size based on their size in the db
        day.style.height = `${(dayHeight * image.height) / 10000.0}px`;
        day.style.width = `${(dayWidth * image.width) / 10000.0}px`;
        day.style.marginTop = `${(dayYOffset * image.height) / 10000.0}px`;
        day.style.marginLeft = `${(dayXOffset * image.width) / 10000.0}px`;
        day.style.zIndex = "1";

        section.style.height = `${(sectionHeight * image.height) / 10000.0}px`;
        section.style.width = `${(sectionWidth * image.width) / 10000.0}px`;
        section.style.marginTop = `${
          (sectionYOffset * image.height) / 10000.0
        }px`;
        section.style.marginLeft = `${
          (sectionXOffset * image.width) / 10000.0
        }px`;
        section.style.zIndex = "2";

        // Adjust the container for the form
        container.style.height = `${image.height}px`; //workaround for now, probably a more efficient way to do this

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
        sectionHeading.id = "sectionHeading" + index.toString();

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
        content.id = "collapseSection" + index.toString();
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
        button.id = "innerSectionCollapse" + index.toString();

        if (document.getElementsByClassName("section-settings").length > 0) {
          // If on section settings page
          // Give the 'add color' button inside of this accordion reference its own unique index
          var checkBox = document.getElementById("alternating-color");
          checkBox.id = "alternating-color" + index.toString();
          checkBox.setAttribute("data-id", (index + 5).toString());
          console.log(checkBox);

          var colorContent = document.getElementById("colors");
          colorContent.id = (index + 5).toString();

          // Add '[]' to the end of the 'name' attribute for text color fields
          // This allows rails to accept multiple inputs for color fields
          var colorFieldCount = document.getElementsByClassName("text-color")
            .length;
          for (var i = 0; i < colorFieldCount; i++) {
            var tempColorField = document.getElementsByClassName("text-color")[
              i
            ];
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
        } else {
          // On lineup form page
          // Add '[]' to the end of the 'name' attribute for act fields
          // This allows rails to accept multiple inputs for act fields
          var actCount = document.getElementsByClassName("acts").length;
          for (var i = 0; i < actCount; i++) {
            var tempAct = document.getElementsByClassName("acts")[i];
            var currentName = tempAct.getAttribute("name");
            if (
              currentName.substr(
                currentName.length - 2,
                currentName.length - 1
              ) != "[]"
            ) {
              tempAct.setAttribute("name", currentName + "[]");
            }
          }
        }
      });
  }
}
