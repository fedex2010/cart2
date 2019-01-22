const fetch = require("node-fetch");
var fs = require("fs");
let config = require("../server/config/config");

var newIndex;
var jsInlineList = "";
var cssInlineList = "";
var jsBrand = "";
var data = fs.readFileSync("indexTemplate.html", "utf-8");

var baseUrl = config.normandia.base_url[process.argv[2]];

baseUrl += "/template/all?analytics=off&webp=true";

console.log(baseUrl);

fetch(baseUrl)
  .then(res => res.json())
  .catch(err => console.error(err))
  .then(json => {
    var cssTemplate =
      '<link href="<inline CSS>" rel="stylesheet" type="text/css">\n    ';
    json.css.forEach(css => {
      cssInlineList += cssTemplate.replace("<inline CSS>", css);
    });
    newIndex = data.replace("<!-- <norma CSS> -->", cssInlineList);

    var jsTemplate =
      '<script src="<inline Js>" crossorigin="anonymous"></script>\n    ';
    json.js.forEach(js => {
      jsInlineList += jsTemplate.replace("<inline Js>", js);
    });

    var brand=

    jsBrand='<script>\n' +
        '        window.xBrand ="' + process.argv[2] +'";\n' +
        '    </script>';

    newIndex = newIndex.replace("<!-- <norma Js> -->", jsInlineList);
    newIndex = newIndex.replace("<!-- <norma Js Brand> -->", jsBrand);
    newIndex = newIndex.replace("<!-- <norma Header> -->", json.headerHtml);
    newIndex = newIndex.replace("<!-- <norma Footer> -->", json.footerHtml);

    fs.unlink("./public/index.html", err => {
      if (err) console.log("./public/index.html was deleted");
    });

    fs.writeFileSync("./public/index.html", newIndex, "utf-8");

    console.log("norma inject in " + process.argv[2] + " complete");
  })
  .catch(err => console.error(err));
