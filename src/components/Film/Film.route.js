import { Router } from 'express';

import * as FilmController from './Film.controller.js';
import * as FilmValidator from './Film.validator.js';

const router = new Router();

router.route('/get-all')
  .get(
    FilmController.getAllFilmController
  );

router.route('/get-by-name/:name')
  .get(
    FilmValidator.getFilmNameValidator,
    FilmController.getOneFilmByNameController
  );

router.route('/add-one')
  .post(
    FilmValidator.getFilmBodyValidator,
    FilmController.addOneFilmController
  );

router.route('/delete-one/:id')
  .delete(
    FilmValidator.getFilmIdValidator,
    FilmController.deleteOneByIdController
  );

router.route('/update-one/:id')
  .put(
    FilmValidator.getFilmIdValidator,
    FilmValidator.getFilmBodyValidator,
    FilmController.updateOneByIdController
  );

export default router;
