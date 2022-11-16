import { Router } from 'express';

import AuthorizeRoute from './components/Authorize/Authorize.route.js';

import ActorRoute from './components/Actor/Actor.route.js';

import FilmRoute from './components/Film/Film.route.js';

const router = new Router();

router.use('/author', [AuthorizeRoute]);

router.use('/actor', [ActorRoute]);

router.use('/film', [FilmRoute]);

export default router;
