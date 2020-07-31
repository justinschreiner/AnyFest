import { Controller } from "stimulus";
import html2canvas from "html2canvas";

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
        var sectionFont = this.data.get("section-font");
        var sectionWeight = this.data.get("section-weight");
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
        section.style.height = `${(sectionHeight * image.height) / 10000.0}px`;
        section.style.width = `${(sectionWidth * 100.0) / 10000.0}%`;
        section.style.marginTop = `${
          (sectionYOffset * image.height) / 10000.0
        }px`;
        section.style.marginLeft = `${(sectionXOffset * 100.0) / 10000.0}%`;
        section.style.zIndex = "2";
        section.style.fontSize = "1px";

        // Fill the section with the text from the lineup form
        var innerText = "";
        for (var i = 0; i < acts.length; i++) {
          var numColors = sectionTextColors.length;
          var numIndex = i % numColors;
          innerText += `<span style= 'color: ${sectionTextColors[numIndex]}; font-family: ${sectionFont}; font-weight: ${sectionWeight};'> ${acts[i]} </span>`;

          // Add the delineator between acts
          if (i < acts.length - 1) {
            innerText += `<span style= 'color: ${sectionDelineatorColor}; font-weight: ${sectionWeight};'> ${sectionDelineator} </span>`;
          }
        }
        section.innerHTML = innerText;

        // Append the new boxes to the image
        container.appendChild(section);

        // Scale the font to the section
        fitText(section);

        // Get rid of extra delineators
        fixDelineator(section, sectionDelineator);

        // Adjust conatiner div's size so that html2canvas works properly
        fixLineupDiv();

        // Change the href of the download button to the file containing the lineup image
        // prepDownloadLink();
      });
  }
}

function fitText(outputDiv) {
  // max font size in pixels
  const maxFontSize = 50;

  // get fontSize
  let fontSize = parseInt(outputDiv.style.fontSize);

  // if content's width or height is bigger then elements width or height- overflow
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
      outputDiv.scrollWidth <= outputDiv.clientWidth &&
      fontSize < maxFontSize &&
      outputDiv.scrollHeight <= outputDiv.clientHeight
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
  var indexArr = [];

  // Make an array with the indexes of all delineators which come before/after a line break
  for (var i = 1; i < spans.length - 1; i++) {
    if (prev.offsetTop < cur.offsetTop) {
      if (cur.innerText == delineator + " ") {
        indexArr.push(i);
      } else if (prev.innerText == delineator + " ") {
        indexArr.push(i - 1);
      }
    }

    // increment index
    prev = cur;
    cur = spans[i + 1];
  }

  // Go through the array of indexes
  for (var j = 0; j < indexArr.length; j++) {
    // If we aren't checking the last row in this section
    if (j < indexArr.length - 1) {
      // If the delineator either starts or finishes a line
      if (
        spans[indexArr[j]].offsetLeft == sectionOffsetLeft ||
        spans[indexArr[j]].offsetLeft >= container.clientWidth * 0.9
      ) {
        spans[indexArr[j]].innerText = "";
      }
    }
    // This is the last row for the section
    else {
      spans[indexArr[j]].innerText = "";
    }
  }
}

function fixLineupDiv() {
  var lineup = document.getElementById("lineup");
  var img = document.getElementsByClassName("image")[0];
  var imgRect = img.getBoundingClientRect();
  lineup.style.height = `${imgRect.height}px`;
  lineup.style.width = `${imgRect.width}px`;
}

// function prepDownloadLink() {
//   var img = document.getElementById("lineup");
//   var link = document.getElementById("download-link");
//   html2canvas(img).then(function (canvas) {
//     var imgFile = canvas.toDataURL("image/png");
//     link.href = imgFile;
//   });
// }
