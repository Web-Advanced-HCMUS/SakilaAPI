import { Router } from "express";

import * as ActorController from './Actor.controller.js';

const router = new Router();

router.route('/get-list')
  .get(
    ActorController.getListAllController
  );

router.route('/find-by-id/:id')
  .get(
    ActorController.findOneByIdController
  );

router.route('/add-one')
  .post(
    ActorController.addActorController
  );
  
router.route('/delete-one/:id')
  .delete(
    ActorController.deleteOneActorController
  );

router.route('/update-one')
  .put(
    ActorController.updateOneActorController
  );

export default router;
