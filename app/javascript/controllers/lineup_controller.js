import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    window.addEventListener("resize", this._debounce(this.resize, 500));
    // Wait for the image to load to the page
    document
      .getElementsByClassName("image")[0]
      .addEventListener("load", (e) => {
        // Get data from view
        var sectionDelineator = this.data.get("section-delineator");
        var sectionFont = this.data.get("section-font");
        var sectionWeight = this.data.get("section-weight");
        var sectionTextColors = JSON.parse(
          this.data.get("section-text-colors")
        );
        var sectionDelineatorColor = this.data.get("section-delineator-color");
        var acts = JSON.parse(this.data.get("acts"));

        var container = document.querySelector(".text");

        // Make the div that will be the container for text
        var section = document.createElement("div");
        this.section = section;
        this.delineator = sectionDelineator;

        section.classList.add("section");

        // Fill the section with the text from the lineup form
        var innerText = "";
        for (var i = 0; i < acts.length; i++) {
          var numColors = sectionTextColors.length;
          var numIndex = i % numColors;

          // If name has a space in it, wrap each word in its own span - helps with fixSectionDelineator()
          var tempName = acts[i];
          if (tempName.includes(" ")) {
            tempName = tempName.split(" ");
            for (var j = 0; j < tempName.length; j++) {
              innerText += `<span style = 'color: ${sectionTextColors[numIndex]}; font-family: ${sectionFont}; font-weight: ${sectionWeight};'> ${tempName[j]} </span>`;
            }
          } else {
            innerText += `<span style = 'color: ${sectionTextColors[numIndex]}; font-family: ${sectionFont}; font-weight: ${sectionWeight};'> ${tempName} </span>`;
          }

          // Add the delineator between acts
          if (i < acts.length - 1) {
            innerText += `<span class = 'delineator' style= 'color: ${sectionDelineatorColor}; font-weight: ${sectionWeight};'> ${sectionDelineator} </span>`;
          }
        }
        section.innerHTML = innerText;

        // Append the new boxes to the image
        container.appendChild(section);

        this._updateSectionSize();

        // Scale the font to the section
        fitText(section);

        // Get rid of extra delineators
        fixDelineator(section, sectionDelineator);
      });
  }

  resize() {
    this._updateSectionSize();
    fitText(this.section);
    fillDelineators(this.section, this.delineator);
    fixDelineator(this.section, this.delineator);
  }

  _debounce(func, wait, immediate) {
    var timeout;
    return () => {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  _updateSectionSize() {
    let image = document.querySelector(".image");
    let sectionHeight = this.data.get("section-height");
    let sectionWidth = this.data.get("section-width");
    let sectionYOffset = this.data.get("section-y-offset");
    let sectionXOffset = this.data.get("section-x-offset");

    // Make the box the right size, bring it to the front, and start the text small
    this.section.style.height = `${(sectionHeight * image.height) / 10000.0}px`;
    this.section.style.width = `${(sectionWidth * 100.0) / 10000.0}%`;
    this.section.style.marginTop = `${
      (sectionYOffset * image.height) / 10000.0
    }px`;
    this.section.style.marginLeft = `${(sectionXOffset * 100.0) / 10000.0}%`;
    this.section.style.zIndex = "2";
    this.section.style.fontSize = "1px";
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
  var linesIndexArr = [[]];
  var tempArr = [prev];

  // Make an array of arrays that hold indexes of spans on the same line
  for (var i = 1; i < spans.length; i++) {
    if (
      Math.ceil(prev.getBoundingClientRect().top) >=
      Math.floor(cur.getBoundingClientRect().top)
    ) {
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
    // if the end of a line is the delineator, get rid of that delineator
    if (
      linesIndexArr[i][linesIndexArr[i].length - 1].innerText ==
      `${delineator} `
    ) {
      linesIndexArr[i][linesIndexArr[i].length - 1].innerText = "";
    }
    // if the beginning of a line is the delineator, get rid of the delineator
    else if (linesIndexArr[i][0].innerText == `${delineator} `) {
      linesIndexArr[i][0].innerText = "";
    }
  }
}

function fillDelineators(section, delineator, color, weight) {
  let delineators = section.getElementsByClassName("delineator");
  for (let j = 0; j < delineators.length; j++) {
    delineators[j].innerText = `${delineator}`;
  }
}
