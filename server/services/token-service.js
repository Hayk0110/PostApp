const Token = require("../models/Token");
const jwt = require("jsonwebtoken");


class TokenService{

    generateAccessToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: "30m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: "30d"});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({user: userId});

        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData;
    }
    async findToken(refreshToken){
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
            return userData
        } catch (e) {
            return null;
        }
    }

    

}

module.exports = new TokenService();