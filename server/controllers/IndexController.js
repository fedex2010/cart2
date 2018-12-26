const RestClient = require("../client");

class indexController{

    constructor() {
    }

    renderApp(req, res) {
        const brand = res.locals.xBrand.toLowerCase();
        console.log("norma");
        RestClient.normandia.getTemplate("desktop",brand,false)
            .then((normandia)=>{
                return res.render(
                    'index',
                    {
                        normandia: normandia,
                        environment:"dev",
                        statics_endpoint:"",
                        gtm:{},
                        isGarbarino:true
                    }
                )
            })
            .catch()
    }
}

module.exports = indexController;