const fetch = require("node-fetch");
var fs = require("fs");

var newIndex;
var jsInlineList = "";
var cssInlineList = "";
var data = fs.readFileSync("indexTemplate.html", "utf-8");

fs.unlink("./public/index.html", err => {
  if (err) console.log("./public/index.html was deleted");
});

var baseUrl =
  process.argv[2] === "garbarino"
    ? "https://ci.garbarino.com/normandia"
    : "https://ci.compumundo.com.ar/normandia";

baseUrl += "/template/all?analytics=off&webp=true";

console.log(baseUrl);

fetch(baseUrl)
  .then(res => res.json())
  .catch(err => console.error(err))
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

    console.log("norma inject in " + process.argv[2] + " complete");
  })
  .catch(err => console.error(err));
