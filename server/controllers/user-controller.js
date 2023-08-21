const userService = require("../services/user-service")
const ApiError = require("../exceptions/api-error");
const { validateSignin, validateSignup } = require("../validation/schemas/userSchemas");


class UserController {
    async registration(req, res, next) {
        try {
            const { error } = validateSignup(req.body);
            if (error) {
                return next(error.details)
            }

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { error } = validateSignin(req.body);

            if (error) {
                return next(error.details)
            }

            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token)
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const { token, userId } = req.body;
            let userData;
            if (token) {
                userData = await userService.getUser(token)
            };
            if (userId) {
                userData = await userService.getUserById(userId)
            }
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();