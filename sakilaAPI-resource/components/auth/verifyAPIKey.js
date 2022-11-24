import dotenv from 'dotenv';
import {genSign} from "../../utils/sign.js";
dotenv.config();

const timeExpired =process.env.TIME_EXPIRED; // 30s

const verifyTokenUsingSecretKey = async function(req, res, next) {
    const {time, sign} = req.query;

    if(!time || !sign){
        res.status(400).json({
            status: 'error',
            message: 'bad request !'
        })
    }

    const differentTime = Math.floor(Date.now() - time)
    if(differentTime > timeExpired){
        res.status(401).json({
            status: 'error',
            message: 'expired !'
        })
    }

    const signServer = genSign(req.query, time);
    if(signServer !== sign){
        res.status(401).json({
            status: 'error',
            message: 'sign invalid !'
        })
    }

    next()
}

export {
    verifyTokenUsingSecretKey
}
