const logger = require("../utils/logger")

exports.getErrorObject = (message,code) =>{
    code = ( typeof code === "string" )? parseInt(code) :code

    let error = {
                    erro:{
                        cause : {
                            code : code,
                            message : message
                        }
                    }
                }
                
    return error
}

exports.getErrorCode = (err) => {
    try{
        return err.erro.cause.code
    }catch(anotherError){
        logger.warn("error object has no rigth structure")
        return 500
    }
}

exports.checkErrorObject = (err = {} ) => {
    
    let errorMessage = err.message || "Internal server error"
    let errorCode = err.code || 500
    
    let erro = err

    if( !erro.hasOwnProperty("cause") ){

        errorMessage = erro.message || errorMessage
        errorCode = erro.code || errorCode
    }else{
    
        errorMessage = erro.cause.message || errorMessage
        errorCode = erro.cause.code || errorCode
    }
    
    return this.getErrorObject(errorMessage,errorCode)
}