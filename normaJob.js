// const fetch = require("node-fetch"),
//   fs = require("fs"),
//   serverConfig = require("./server/config/config"),
//   clientConfig = require("./client/src/config/config"),
//   minify = require("minify");

// let self = {};

// self.job = (brand, islocal) => {
//   let isLocal = !!islocal;
//   let newIndex;
//   let gtmId = "";

//   let jsInlineList = "";
//   let cssInlineList = "";

//   console.log("*************brand****************");
//   console.log(brand);

//   switch (brand) {
//     case "compumundo":
//       gtmId = clientConfig.google.gtm_id.compumundo;
//       break;
//     case "empresarias":
//       gtmId = clientConfig.google.gtm_id.empresarias;
//       break;
//     default:
//       gtmId = clientConfig.google.gtm_id.garbarino;
//       break;
//   }


//   let jsBrand = '<script>\n        window.xBrand ="' + brand + '"; </script>';

//   let jsDataLayer =
//     "<script>\n          if (typeof dataLayer === 'undefined') {\n              dataLayer = [];\n          }\n      </script>";

//   let jsInlineTagManager =
//     "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
//     "                new Date().getTime(),event:'gtm.js'});let f=d.getElementsByTagName(s)[0],\n" +
//     "                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
//     "                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
//     "            })(window,document,'script','dataLayer','" +
//     gtmId +
//     "');</script>";

//   let cssTemplate =
//     '<link href="<inline CSS>" rel="stylesheet" type="text/css">\n  ';

//   let jsTemplate = '<script src="<inline Js>" ></script>\n  ';

//   let noscript =
//     '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=' +
//     gtmId +
//     '" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';

//   let baseUrl =
//     serverConfig.normandia.base_url[brand] +
//     "/template/all?analytics=off&webp=true";

//   let title = brand.charAt(0).toLocaleUpperCase() + brand.slice(1);

//   let favicon = "favicon_" + brand + ".png";

//   let data;
//   if (isLocal) {
//     data = fs.readFileSync("../client/indexTemplate.html", "utf-8");
//   } else {
//     data = fs.readFileSync("./client/build/index.html", "utf-8");
//   }

//   console.log(baseUrl);
//   console.log("\n");

//   fetch(baseUrl)
//     .then(res => res.json())
//     .catch(err => console.error(err))
//     .then(json => {
//       json.css.forEach(css => {
//         cssInlineList += cssTemplate.replace("<inline CSS>", css);
//       });

//       json.js.forEach(js => {
//         jsInlineList += jsTemplate.replace("<inline Js>", js);
//       });
//       newIndex = data.replace("/*!*title*/", title);
//       newIndex = newIndex.replace("/*!*favicon*/", favicon);
//       newIndex = newIndex.replace("/*!*favicoislocaln-apple*/", favicon);
//       newIndex = newIndex.replace("/*!*norma CSS*/", cssInlineList);
//       newIndex = newIndex.replace(
//         "/*!*googleTagManageDataLayerr*/",
//         jsDataLayer
//       );
//       newIndex = newIndex.replace("/*!*googleTagManager*/", jsInlineTagManager);
//       newIndex = newIndex.replace("/*!*norma Js*/", jsInlineList);
//       newIndex = newIndex.replace("/*!*norma Js Brand*/", jsBrand);
//       newIndex = newIndex.replace("/*!*norma Header*/", json.headerHtml);
//       newIndex = newIndex.replace("/*!*norma Footer*/", json.footerHtml);
//       newIndex = newIndex.replace("/*!*noscript*/", noscript);

//       if (isLocal) {
//         fs.unlink("../client/public/index.html", err => {
//           if (err) console.log("../client/public/index.html was NOT deleted");
//         });
//         fs.writeFileSync("../client/public/index.html", newIndex, "utf-8");        
//       } else {
//         fs.writeFileSync("./server/public/"+site+"/index.html", newIndex, "utf-8");
//         // minify("./public/" + brand + "/" + brand + ".html")
//         //   .then(console.log)
//         //   .catch(console.error);
//       }
//       console.log("norma inject in " + brand + " complete");
//     })
//     .catch(err => console.error(err));
// };

// if (process.argv[2]) {
//   console.log("Circle Norma sync -> ",process.argv[2],process.argv[3])
//   self.job(process.argv[2], process.argv[3]);
// }
// module.exports = self;
