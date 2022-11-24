import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import {genSign} from "../../utils/sign.js";
dotenv.config();

const signAccessToken = async function(payload){
    return await JWT.sign(payload, process.env.KEY_ACCESSTOKEN, {expiresIn: '60m'});
}

const signRefreshToken = async function(payload){
    return await JWT.sign(payload, process.env.KEY_REFRESRHTOKEN);
}

const verifyAccessToken = async function(req, res, next) {
    try {
        if(req.headers['x-token'] || req.query.token){
            const token = req.headers['x-token'] || req.query.token;
            console.log(token)
            const payload = await JWT.verify(token, process.env.KEY_ACCESSTOKEN);
            req.user = payload;

            req.currentTime = Date.now();
            req.sign = genSign(req.query, req.currentTime);

            next();
        }
        else {
            return res.status(200).json({
                code: 200,
                message: 'NoTokenProvided'
            })
        }
    }
    catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(200).json({
                code: 401,
                message: error.message
            })
        }
        return res.status(200).json({
            code: 500,
            message: error.message
        })
    }

}

export {
    verifyAccessToken,
    signAccessToken,
    signRefreshToken
}
