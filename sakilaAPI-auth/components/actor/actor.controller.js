import axios from "axios";

const baseUrl = 'http://localhost:3333/api';

const getAllActors = async (req, res, next) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${baseUrl}/actors`,
            params: {
                time: req.currentTime,
                sign: req.sign
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}

const getActorWithID = async (req,res, next) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${baseUrl}/actors/${req.params.actorID}`,
            params: {
                time: req.currentTime,
                sign: req.sign
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}

const addActor = async (req, res, next) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/actors`,
            params: {
                time: req.currentTime,
                sign: req.sign
            },
            data: {
                ...req.body
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}

const updateActor = async (req, res, next) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${baseUrl}/actors/${req.params.actorID}`,
            params: {
                time: req.currentTime,
                sign: req.sign
            },
            data: {
                ...req.body
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}
const deleteActor = async (req, res, next) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${baseUrl}/actors/${req.params.actorID}`,
            params: {
                time: req.currentTime,
                sign: req.sign
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}

export {
    getAllActors,
    getActorWithID,
    addActor,
    updateActor,
    deleteActor
}
