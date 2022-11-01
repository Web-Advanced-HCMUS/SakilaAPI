import { Router } from "express";

import * as ActorController from './Actor.controller.js';
import * as ActorValidator from './Actor.validator.js';

const router = new Router();

router.route('/get-list')
  .get(
    ActorController.getListAllController
  );

router.route('/find-by-id/:id')
  .get(
    ActorValidator.getActorIdValidator,
    ActorController.findOneByIdController
  );

router.route('/add-one')
  .post(
    ActorValidator.getFullNameValidator,
    ActorController.addActorController
  );
  
router.route('/delete-one/:id')
  .delete(
    ActorValidator.getActorIdValidator,
    ActorController.deleteOneActorController
  );

router.route('/update-one/:id')
  .put(
    ActorValidator.getActorIdValidator,
    ActorValidator.getFullNameValidator,
    ActorController.updateOneActorController
  );

export default router;
