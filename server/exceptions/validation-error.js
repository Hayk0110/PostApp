module.exports = class ValidateError extends Error {
    path;
    message;

    constructor(path, message) {
        super(message);

        this.path = path;
        this.message = message
    }

    static isRequired(path){
        return new ValidateError(path, `${path} is required`)
    }

    static isNotEmail() {
        return new ValidateError("email", "enter Valid email")
    }

    static isEmpty(path){
        return new ValidateError(path, `${path} can not be empty`)
    }

    static isLess(path, limit){
        return new ValidateError(path, `${path} must be at least ${limit} characters`)
    }

    static isMore(path, limit){
        return new ValidateError(path, `${path} must be less than ${limit+1} characters`)
    }

    static isNotSamePassword(path){
        return new ValidateError(path, `Password didn't match`)
    }

    static numberIsLess(path, limit){
        return new ValidateError(path, `${path} must be greater than or equal to ${limit}`)
    }

    static numberIsMore(path, limit){
        return new ValidateError(path, `${path} must be less than or equal to ${limit}`)
    }

}