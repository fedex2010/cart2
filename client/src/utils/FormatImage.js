import config from "../config/config";

export const formatImage = (imageUrl) => {
   
    //
    let product_image_sha = imageUrl.split("/");
    product_image_sha = product_image_sha[product_image_sha.length-1];
    let product_image_route = product_image_sha.split(".");
    product_image_route = product_image_route[0];

    let extension = ".jpg";

    if(navigator.userAgent.indexOf("Chrome") !== -1){
        //Chrome
        extension = ".webp";
        product_image_route = product_image_route + extension;
        
    }else {
        extension = ".jpg";
        product_image_route = product_image_route + extension;   
    }

    //

    product_image_route = config.cloudfront.urlImageProduct +product_image_route ;
    return product_image_route;


};




