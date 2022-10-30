import { Router } from "express";

import * as ActorController from './Actor.controller.js';

const router = new Router();

router.route('/get-list')
  .get(
    ActorController.getListAllController
  );

router.route('/add-one')
  .post(
    ActorController.addActorController
  );

export default router;
