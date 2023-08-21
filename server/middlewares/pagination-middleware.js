const sortData = require("../utils")

module.exports = function(result,req,res,next){
    try {
        const {sort, page, limit} = req.queryParams

        if(!page || !limit){
            res.json(result)
        }

        result.data = sortData(result.data, sort)
        
        const totalPages = Math.ceil(result.data.length / limit) 
        
        const startIndex = ( +(page) - 1 ) * +(limit)
        const endIndex = +(page) * +(limit)

        result.data = result.data.slice(startIndex, endIndex)

        result.pagination = {
            totalPages,
            currentPage: +page
        }

        res.json(result)
    } catch (e) {
        next(e)
    }
}