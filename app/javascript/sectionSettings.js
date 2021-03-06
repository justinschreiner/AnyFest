// Javascript to help the section settings page

// Expands and collapses the add color icon based on whether or not the alternating colors box is checked or not
window.collapseAddColor = function (self) {
  var id = self.getAttribute("data-id");
  var content = document.getElementById(id);
  if (content.classList.contains("show")) {
    content.classList.remove("show");
    let elements = content.parentNode.children;
    for (i = elements.length - 1; i > 2; i--) {
      elements[i].parentNode.removeChild(elements[i]);
    }
  } else {
    content.classList.add("show");
  }
};

window.addColorField = function (item) {
  colorSection = item.parentNode.parentNode;

  var label = colorSection.children[0];
  var field = colorSection.children[1];
  var button = colorSection.lastChild;

  labelClone = label.cloneNode(true);
  fieldClone = field.cloneNode(true);
  buttonClone = button.cloneNode(true);

  colorSection.removeChild(button);

  colorSection.appendChild(labelClone);
  colorSection.appendChild(fieldClone);
  colorSection.appendChild(buttonClone);
};

document.addEventListener("turbolinks:load", function () {
  $('[data-toggle="popover"]').popover();
});
