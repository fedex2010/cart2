"use strict";


exports.getErrorObject = (message,code) =>{
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