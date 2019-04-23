const fetch = require("node-fetch");
var fs = require("fs");
let config = require("../server/config/config");
let configClient = require("./src/config/config");

var newIndex;
var jsInlineList = "";
var cssInlineList = "";
var jsBrand = "";
var data = fs.readFileSync("indexTemplate.html", "utf-8");

var baseUrl = config.normandia.base_url[process.argv[2]];

console.log("Running norma Job");

baseUrl += "/template/all?analytics=off&webp=true";

let gtmId = configClient.google.gtm_id[process.argv[2]];

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

    jsBrand='<script>\n' +
        '        window.xBrand ="' + process.argv[2] +'";\n' +
        '    </script>';

    var jsInlineTagManager=
        '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n' +
        '                new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n' +
        '                j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n' +
        '                \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n' +
        '            })(window,document,\'script\',\'dataLayer\',\''+gtmId+'\');</script>';

    var jsDataLayer='<script>\n' +
        '          if (typeof dataLayer === \'undefined\') {\n' +
        '              dataLayer = [];\n' +
        '          }\n' +
        '      </script>'


    newIndex = newIndex.replace("<!-- <googleTagManageDataLayerr> -->", jsDataLayer);
    newIndex = newIndex.replace("<!-- <googleTagManager> -->", jsInlineTagManager);
    newIndex = newIndex.replace("<!-- <norma Js> -->", jsInlineList);
    newIndex = newIndex.replace("<!-- <norma Js Brand> -->", jsBrand);
    newIndex = newIndex.replace("<!-- <norma Header> -->", json.headerHtml);
    newIndex = newIndex.replace("<!-- <norma Footer> -->", json.footerHtml);

    fs.unlink("./public/"+process.argv[2]+"/index.html", err => {
      if (err) console.log("./public/"+process.argv[2]+"/index.html was deleted");
    });

    fs.writeFileSync("./public/"+process.argv[2]+"/index.html", newIndex, "utf-8");

    console.log("norma inject in " + process.argv[2] + " complete");
  })
  .catch(err => console.error(err));
