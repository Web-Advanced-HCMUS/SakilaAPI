import { Router } from 'express';

import ActorRoute from './components/Actor/Actor.route.js';

import FilmRoute from './components/Film/Film.route.js';

const router = new Router();

router.use('/actor', [ActorRoute]);

router.use('/film', [FilmRoute]);

export default router;
