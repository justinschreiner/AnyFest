import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    document.getElementsByTagName("img")[0].addEventListener("load", (e) => {
      // Make Boxes
      // Get data from view
      var sectionHeight = this.data.get("sectionheight");
      var sectionWidth = this.data.get("sectionwidth");
      var sectionYOffset = this.data.get("section-y-offset");
      var sectionXOffset = this.data.get("section-x-offset");
      var sectionDelineator = this.data.get("sectiondelineator");
      var sectionTextColors = JSON.parse(this.data.get("sectionTextColors"));
      var sectionDelineatorColor = this.data.get("sectionDelineatorColor");
      var acts = JSON.parse(this.data.get("acts"));

      var image = document.getElementsByTagName("img")[0];
      var container = document.getElementsByClassName("text")[0];

      // Make the divs that will be the boxes
      var section = document.createElement("div");

      section.setAttribute("class", "section");

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

      var innerText = "";
      for (var i = 0; i < acts.length; i++) {
        var numColors = sectionTextColors.length;
        var numIndex = i % numColors;
        innerText +=
          "<span style= 'color: " +
          sectionTextColors[numIndex] +
          ";'> " +
          acts[i] +
          " </span>";

        if (i < acts.length - 1) {
          innerText +=
            "<span style= 'color: " +
            sectionDelineatorColor +
            ";'> " +
            sectionDelineator +
            " </span>";
        }
      }

      section.innerHTML = innerText;
      // Append the new boxes to the image
      container.appendChild(section);
    });
  }
}
