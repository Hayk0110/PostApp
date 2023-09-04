const validationCases = require("../validation/validationCases");

module.exports = function (errors, req, res, next) {
    try {
        console.log(errors)
        const validation = errors.map((error) =>
            validationCases(error)
        )


        next(validation)
    } catch (e) {
        console.log(e)
        next(e)
    }
}