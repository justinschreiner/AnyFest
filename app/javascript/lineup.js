import html2canvas from "html2canvas";

window.addEventListener("DOMContentLoaded", (event) => {
  window.download = function () {
    var img = document.getElementById("lineup");
    html2canvas(img).then(function (canvas) {
      var btn = document.getElementById("right");
      btn.appendChild(canvas);
    });
  };
});
