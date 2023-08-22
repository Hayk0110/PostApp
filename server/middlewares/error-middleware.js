const ApiError = require("../exceptions/api-error");

module.exports = function(err, req, res, next){
    if(Array.isArray(err)){
        return res.status(400).json(err)
    }
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Unknown Error"})
}