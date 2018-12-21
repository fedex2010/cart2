const RestClient = require("../client"),
    logger = require("../utils/logger");

class NormandiaController{
    constructor(){}

    getTemplate(req , res){
        console.log("NORMANDIA!!")

        // TODO meter el device en el res.locals.device asi esta siempre (res.locals.device)

        let brand = res.locals.xBrand.toLowerCase();
        return RestClient.normandia.getTemplate("desktop",brand,false)
            .then((normandia)=>{
                res.send(normandia);
            })
            .catch((e)=>{
                res.status(500).send("Fail get template normandia");
            })
    }
}

module.exports = NormandiaController;