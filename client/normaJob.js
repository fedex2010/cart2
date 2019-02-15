const fetch = require("node-fetch");
var fs = require("fs");
let serverConfig = require("../server/config/config");
let clientConfig = require("./src/config/config");

var newIndex;
let gtmId = clientConfig.google.gtm_id[process.argv[2]];
var jsInlineList = "";
var cssInlineList = "";

var jsBrand = '<script>\n        window.xBrand ="' + process.argv[2] + '";\n    </script>';

var jsDataLayer = '<script>\n          if (typeof dataLayer === \'undefined\') {\n              dataLayer = [];\n          }\n      </script>';

var jsInlineTagManager = '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n' +
  '                new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n' +
  '                j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n' +
  '                \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n' +
  '            })(window,document,\'script\',\'dataLayer\',\'' + gtmId + '\');</script>';

var cssTemplate = '<link href="<inline CSS>" rel="stylesheet" type="text/css">\n    ';

var jsTemplate = '<script src="<inline Js>" crossorigin="anonymous"></script>\n    ';

var baseUrl = serverConfig.normandia.base_url[process.argv[2]] + "/template/all?analytics=off&webp=true";

var title = process.argv[2].charAt(0).toLocaleUpperCase() + process.argv[2].slice(1);

var data = fs.readFileSync("indexTemplate.html", "utf-8");

console.log(baseUrl);

fetch(baseUrl)
  .then(res => res.json())
  .catch(err => console.error(err))
  .then(json => {
    json.css.forEach(css => {
      cssInlineList += cssTemplate.replace("<inline CSS>", css);
    });


    json.js.forEach(js => {
      jsInlineList += jsTemplate.replace("<inline Js>", js);
    });
    newIndex = data.replace("<!-- <title> -->", title);
    newIndex = newIndex.replace("<!-- <norma CSS> -->", cssInlineList);
    newIndex = newIndex.replace("<!-- <googleTagManageDataLayerr> -->", jsDataLayer);
    newIndex = newIndex.replace("<!-- <googleTagManager> -->", jsInlineTagManager);
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
