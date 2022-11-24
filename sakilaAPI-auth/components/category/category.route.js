import express from 'express';
import categoryModel from '../../models/category.model.js';

const router = express.Router();

router.get('/', async function (req, res){
    const list = await categoryModel.findAll();
    res.json(list);
})

export default router;