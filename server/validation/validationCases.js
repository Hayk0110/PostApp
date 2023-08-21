const ValidateError = require("../exceptions/validation-error");

module.exports = function (error) {
    switch (true) {
        case error.message.includes("is required"):
            return ValidateError.isRequired(error.path[0]);
           
        case error.message.includes("must be a valid email"):
            return ValidateError.isNotEmail();

        case error.message.includes("is not allowed to be empty"):
            return ValidateError.isEmpty(error.path[0]);

        case error.message.includes("length must be at least"):
            return ValidateError.isLess(error.path[0], error.context.limit);
            
        case error.message.includes("length must be less than"):
            return ValidateError.isMore(error.path[0], error.context.limit);
            
        case error.message.includes("must be [ref:password]"):
            return ValidateError.isNotSamePassword(error.path[0]);
            
        case error.message.includes("must be greater than or equal to"):
            return ValidateError.numberIsLess(error.path[0], error.context.limit);
            
        case error.message.includes("must be less than or equal to"):
            return ValidateError.numberIsMore(error.path[0], error.context.limit);
            
        default:
            break;
    }
}