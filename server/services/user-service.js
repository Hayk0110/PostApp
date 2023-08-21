const User = require("../models/User");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("../services/token-service");
const ApiError = require("../exceptions/api-error")


class UserService{

    async registration(email,password){
        const candidate = await User.findOne({email});
            if(candidate){
                throw ApiError.BadRequest(`User with ${email} already exist`)
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await User.create({email, password: hashPassword});

            const userDto = new UserDto(user);
            const tokens = tokenService.generateAccessToken({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, user: userDto}
    }

    async login(email, password){
        const user = await User.findOne({email});

        if(!user){
            throw ApiError.NotFound("User");
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            throw ApiError.BadRequest("Wrong password");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateAccessToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken){
        const token = tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateAccessToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async getUser(accessToken){
        const user = tokenService.validateAccessToken(accessToken);

        const userDto = new UserDto(user);
        return userDto;
    }

    async getUserById(id){
        const user = await User.findById(id)

        const userDto = new UserDto(user);
        return userDto;
    }

}

module.exports = new UserService();