import { Controller } from "stimulus";
import html2canvas from "html2canvas";

export default class extends Controller {
  connect() {
    // Wait for lineup image to completely render
    document
      .getElementsByClassName("image")[0]
      .addEventListener("load", (e) => {
        var img = document.getElementById("lineup");
        var link = document.getElementById("download-link");
        html2canvas(img).then(function (canvas) {
          var imgFile = canvas.toDataURL("image/png");
          link.href = imgFile;
        });
        document.getElementById("download").classList.remove("disabled");
      });
  }
}
