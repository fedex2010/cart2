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
