import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    // Wait for the image to load to the page
    document
      .getElementsByClassName("image")[0]
      .addEventListener("load", (e) => {
        // Get data from view
        var sectionHeight = this.data.get("section-height");
        var sectionWidth = this.data.get("section-width");
        var sectionYOffset = this.data.get("section-y-offset");
        var sectionXOffset = this.data.get("section-x-offset");
        var sectionDelineator = this.data.get("section-delineator");
        var sectionTextColors = JSON.parse(
          this.data.get("section-text-colors")
        );
        var sectionDelineatorColor = this.data.get("section-delineator-color");
        var acts = JSON.parse(this.data.get("acts"));

        var image = document.getElementsByClassName("image")[0];
        var container = document.getElementsByClassName("text")[0];

        // Make the div that will be the container for text
        var section = document.createElement("div");

        section.setAttribute("class", "section");

        // Make the box the right size, bring it to the front, and start the text small
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
            "%; z-index: 2; font-size: 1px;"
        );

        // Fill the section with the text from the lineup form
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

          // Add the delineator between acts
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

        // Scale the font to the section
        fitText(section);

        // Get rid of extra delineators
        fixDelineator(section, sectionDelineator);
      });
  }
}

function fitText(outputDiv) {
  // max font size in pixels
  const maxFontSize = 50;

  // get fontSize
  let fontSize = parseInt(outputDiv.style.fontSize);

  // if content's width or height is bigger then elements width or height: overflow
  // scroll___ => content size; client____ => element size
  if (
    outputDiv.scrollWidth > outputDiv.clientWidth ||
    outputDiv.scrollHeight > outputDiv.clientHeight
  ) {
    fontSize = Math.ceil((fontSize * width) / outputDiv.scrollWidth, 10);
    fontSize = fontSize > maxFontSize ? (fontSize = maxFontSize) : fontSize - 1;
    outputDiv.style.fontSize = fontSize + "px";
  } else {
    // resize incrementally by 1 px until text fits
    while (
      Math.floor(outputDiv.scrollWidth) <=
        Math.ceil(outputDiv.getBoundingClientRect().width) &&
      fontSize < maxFontSize &&
      Math.floor(outputDiv.scrollHeight) <=
        Math.ceil(outputDiv.getBoundingClientRect().height)
    ) {
      fontSize = Math.ceil(fontSize) + 1;
      fontSize = fontSize > maxFontSize ? (fontSize = maxFontSize) : fontSize;
      outputDiv.style.fontSize = fontSize + "px";
    }
    // if it's overflowed, go back to the last size before it overflowed
    if (
      outputDiv.scrollWidth > outputDiv.clientWidth ||
      outputDiv.scrollHeight > outputDiv.clientHeight
    ) {
      outputDiv.style.fontSize = fontSize - 1 + "px";
    }
  }
}

// Get rid of extra delineators at the beginning or ending of each line
function fixDelineator(container, delineator) {
  // All names/delineators are wrapped in span tags, get them all
  var spans = container.getElementsByTagName("span");
  var prev = spans[0];
  var cur = spans[1];
  var sectionOffsetLeft = prev.offsetLeft;
  var linesIndexArr = [[]];
  var tempArr = [prev];

  // Make an array of arrays that hold indexes of spans on the same line
  for (var i = 1; i < spans.length; i++) {
    if (prev.getBoundingClientRect().top == cur.getBoundingClientRect().top) {
      tempArr.push(cur);
    } else {
      linesIndexArr.push(tempArr);
      tempArr = [cur];
    }
    prev = cur;
    cur = spans[i + 1];
  }
  linesIndexArr.push(tempArr);
  for (var i = 0; i < linesIndexArr.length; i++) {
    if (linesIndexArr[i].length == 0) {
      continue;
    }
    if (
      linesIndexArr[i][linesIndexArr[i].length - 1].innerText ==
      `${delineator} `
    ) {
      linesIndexArr[i][linesIndexArr[i].length - 1].innerText = "";
    }
    if (
      linesIndexArr[i][0].innerText == `${delineator} ` &&
      linesIndexArr[i][0].offsetLeft == sectionOffsetLeft
    ) {
      linesIndexArr[i][0].innerText = "";
    }
  }
}
