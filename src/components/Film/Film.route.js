import { Router } from 'express';

import * as FilmController from './Film.controller.js';
import * as FilmValidator from './Film.validator.js';

const router = new Router();

router.route('/get-all')
  .get(
    FilmController.getAllFilmController
  );

router.route('/get-one-by-name/:name')
  .get(
    
  );

export default router;
