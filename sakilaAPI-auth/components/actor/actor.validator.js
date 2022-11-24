import {check, validationResult} from 'express-validator';

export default {
        validateAddNewActor() {
            return [
                check('first_name').not().isEmpty().withMessage('first_name does not empty'),
                check('first_name').isString().withMessage('first_name must be string'),
                check('last_name').not().isEmpty().withMessage('last_name does not empty'),
                check('last_name').isString().withMessage('last_name must be string')
            ]
        },

        validateUpdateActor() {
            return [
                check('first_name').not().isEmpty().withMessage('first_name does not empty'),
                check('first_name').isString().withMessage('first_name must be string'),
                check('last_name').not().isEmpty().withMessage('last_name does not empty'),
                check('last_name').isString().withMessage('last_name must be string')
            ]
        },

        validateDeleteActor() {
            return [
                check('actor_id').not().isEmpty().withMessage('actor_id does not empty'),
                check('actor_id').isInt().withMessage('actor_id must be a number'),
            ]
        },

        actorValidation(req, res, next) {
            const result = validationResult(req).array();
            if (!result.length) return next();

            const error = result[0].msg;
            res.json({
                success: false,
                message: error
            })
        },

}
