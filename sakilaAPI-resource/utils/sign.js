import md5 from 'md5';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const version = process.env.VERSION;

const genSign = function(params, time){
    params.time = time;
    params.secretKey = secretKey;
    params.v = version;

    const sortKeys = [];
    for(const key in params){
        if(key !== 'sign'){
            sortKeys.push(key);
        }
    }

    sortKeys.sort();

    let paramsHolder = '';

    sortKeys.forEach(key => {
        paramsHolder += key + params[key];
    })

    return md5(paramsHolder).toString();
}

export {
    genSign
}
