import {userDB} from '../../config/database.config.js';

const createUser = async function(user){
    await userDB('user').insert({...user, role: "user"});
}

const findUser = async function(username){
    return await userDB('user').where('username', username);
}

const findRefreshToken = async function(token){
    return await userDB('user').where('refreshToken', token);
}

const saveRefreshToken = async function(username, token){
    return await userDB('user').where('username', username).update('refreshToken', token);
}

export {
    createUser,
    findUser,
    saveRefreshToken,
    findRefreshToken
}
