import express from 'express';
import bcrypt from 'bcrypt';
import {signAccessToken, signRefreshToken} from './jwt.init.js';
import {createUser, findRefreshToken, findUser, saveRefreshToken} from "./auth.service.js";

const router = express.Router();

router.post('/login', async function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    const user = await findUser(username);

    if(user[0]){
        if(user[0].username === username && bcrypt.compareSync(password, user[0].password)){

            const accessToken = await signAccessToken({user: username});
            const refreshToken = await signRefreshToken({user: username});

            await saveRefreshToken(username, refreshToken);

            return res.status(200).json({
                status: 'success',
                elements:{
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        }
    }

    return res.status(200).json({
        status: 'error',
        message: 'error log in'
    })
})

router.get('/refreshToken', async function (req, res){
    const user = await findRefreshToken(req.query.refreshToken);

    if(user[0]){
        return res.status(200).json({
            status: 'success',
            elements:{
                accessToken: await signAccessToken({user: user[0].username})
            }
        })
    }

    return res.status(200).json({
        status: 'error',
        elements:{
            accessToken: ""
        },
        message: 'Invalid token'
    })
})

router.post('/register', async function (req, res){
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    await createUser(req.body)

    return res.status(200).json({
        message: 'success',
    })
})

export default router;
