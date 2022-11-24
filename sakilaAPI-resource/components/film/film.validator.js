import {check, validationResult} from 'express-validator';

export default {
    validateFilm(){
        return [
            check('title')
                .notEmpty().withMessage('title does not empty')
                .isString().withMessage('title must be string')
                .isLength({max:255}).withMessage('title can not be more than 255 characters'),
            check('release_year')
                .not().isEmpty().withMessage('release_year does not empty')
                .isInt().withMessage('release_year does not empty'),
            check('language_id')
                .not().isEmpty().withMessage('language_id does not empty')
                .isInt().withMessage('language_id must be integer'),
            check('rental_duration')
                .not().isEmpty().withMessage('rental_duration does not empty')
                .isInt().withMessage('rental_duration must be integer'),
            check('rental_rate')
                .not().isEmpty().withMessage('rental_rate does not empty')
                .isDecimal().withMessage('rental_rate must be decimal'),
            check('replacement_cost')
                .not().isEmpty().withMessage('replacement_cost does not empty')
                .isDecimal().withMessage('replacement_cost must be decimal'),
        ]
    },

    filmValidation(req, res, next){
        const result = validationResult(req).array();
        if(!result.length) return next();

        const error = result[0].msg;
        res.json({
            success: false,
            message: error
        })
    }
}
