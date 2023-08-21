const validationCases = require("../validation/validationCases");

module.exports = function (errors, req, res, next) {
    try {
        
        const validation = errors.map((error) =>
            validationCases(error)
        )
        // console.log("Custom Errors:");
        // er.forEach(error => {
        //     console.log(error);
        // });


        next(validation)
    } catch (e) {
        console.log(e)
        next(e)
    }
}