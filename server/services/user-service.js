const User = require("../models/User");
const bcrypt = require("bcrypt");
const uuid = require("uuid")
const UserDto = require("../dtos/user-dto");
const tokenService = require("../services/token-service");
const ApiError = require("../exceptions/api-error");
const mailService = require("./mail-service");


class UserService{

    async registration(email,password){
        const candidate = await User.findOne({email});
            if(candidate){
                throw ApiError.BadRequest(`User with ${email} already exist`)
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const activationLink = uuid.v4();

            const user = await User.create({email, password: hashPassword, activationLink});
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

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

        if(!user.isVerified){
            throw ApiError.BadRequest("Please Verify your account");
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

    async activate(activationLink){
        const user = await User.findOne({activationLink});
        if(!user){
            throw ApiError.BadRequest("Wrong activation link")
        }
        user.isVerified = true;
        await user.save();
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

    async getUser(refreshToken){
        const user = tokenService.validateRefreshToken(refreshToken);

        const userDto = new UserDto(user);
        return userDto;
    }

    async deleteUnverifiedUsers(){
        const oneDayAgo = new Date();
        oneDayAgo.setHours(sixHoursAgo.getHours() - 24);
      
        try {
          await User.deleteMany({ isVerified: false, createdAt: { $lt: oneDayAgo } });
        } catch (error) {
          console.error('Error deleting unverified users:', error);
        }
      }
}

module.exports = new UserService();