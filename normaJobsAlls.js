const fetch = require("node-fetch");
var fs = require("fs");
let serverConfig = require("./server/config/config");
let clientConfig = require("./client/src/config/config");


var site = process.argv[2];

var baseUrl = serverConfig.normandia.base_url[site] + "/template/all?analytics=off&webp=true";

console.log(baseUrl);

var newIndex;
let gtmId = clientConfig.google.gtm_id[site];
var jsInlineList = "";
var cssInlineList = "";
var jsBrand = '<script>\n window.xBrand ="' + site + '";\n </script>';
var jsDataLayer = '<script>\n          if (typeof dataLayer === \'undefined\') {\n              dataLayer = [];\n          }\n      </script>';
var jsInlineTagManager = '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n' +
    '                new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n' +
    '                j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n' +
    '                \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n' +
    '            })(window,document,\'script\',\'dataLayer\',\'' + gtmId + '\');</script>';
var cssTemplate = '<link href="<inline CSS>" rel="stylesheet" type="text/css">\n  ';
var jsTemplate = '<script src="<inline Js>" ></script>\n  ';
var title = site.charAt(0).toLocaleUpperCase() + site.slice(1);
var favicon = "favicon_" + site + ".png";
var data = fs.readFileSync("./client/indexTemplate.html", "utf-8");


fetch(baseUrl)
    .then(res => res.json())
    .then(json => {
        json.css.forEach(css => {
            cssInlineList += cssTemplate.replace("<inline CSS>", css);
        });

        json.js.forEach(js => {
            jsInlineList += jsTemplate.replace("<inline Js>", js);
        });
        newIndex = data.replace("<!-- <title> -->", title);
        newIndex = newIndex.replace("<!-- <favicon> -->", favicon);
        newIndex = newIndex.replace("<!-- <favicon-apple> -->", favicon);
        newIndex = newIndex.replace("<!-- <norma CSS> -->", cssInlineList);
        newIndex = newIndex.replace("<!-- <googleTagManageDataLayerr> -->", jsDataLayer);
        newIndex = newIndex.replace("<!-- <googleTagManager> -->", jsInlineTagManager);
        newIndex = newIndex.replace("<!-- <norma Js> -->", jsInlineList);
        newIndex = newIndex.replace("<!-- <norma Js Brand> -->", jsBrand);
        newIndex = newIndex.replace("<!-- <norma Header> -->", json.headerHtml);
        newIndex = newIndex.replace("<!-- <norma Footer> -->", json.footerHtml);

        /*fs.unlink("./public/index.html", err => {
            if (err) console.log("./public/index.html was deleted");
        });
        */

        console.log("./server/public/"+site+"/"+site+".html")
        fs.writeFileSync("./server/public/"+site+"/"+site+".html", newIndex, "utf-8");

        console.log("norma inject in " + site + " complete");
    })
    .catch(err => console.error(err));


