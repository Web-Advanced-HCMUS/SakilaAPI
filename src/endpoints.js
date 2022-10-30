import { Router } from "express";

import ActorRoute from './components/Actor/Actor.route.js';

const router = new Router();

router.use('/actor', [ActorRoute]);

export default router;
