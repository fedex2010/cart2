const fetch = require("node-fetch");
var fs = require("fs");

var newIndex;
var jsInlineList = "";
var cssInlineList = "";
var data = fs.readFileSync("indexTemplate.html", "utf-8");

fetch("https://ci.garbarino.com/normandia/template/all?analytics=off&webp=true")
  .then(res => res.json())
  .then(json => {
    var cssTemplate =
      '<link href="<inline CSS>" rel="stylesheet" type="text/css">\n';

    json.css.forEach(css => {
      cssInlineList += cssTemplate.replace("<inline CSS>", css);
    });

    newIndex = data.replace("<!-- <norma CSS> -->", cssInlineList);

    var jsTemplate =
      '<script src="<inline Js>" crossorigin="anonymous"></script>\n';

    json.js.forEach(js => {
      jsInlineList += jsTemplate.replace("<inline Js>", js);
    });

    newIndex = newIndex.replace("<!-- <norma Js> -->", jsInlineList);
    newIndex = newIndex.replace("<!-- <norma Header> -->", json.headerHtml);
    newIndex = newIndex.replace("<!-- <norma Footer> -->", json.footerHtml);

    fs.writeFileSync("./public/index.html", newIndex, "utf-8");

    console.log("norma inject complete");
  });
