import { Router } from 'express';

import * as AuthorizeController from './Authorize.controller.js';

const router = new Router();

router.route('/get-tokens')
  .post(
    AuthorizeController.getAccessTokenController
  );

router.route('/refresh-token')
  .post(
    AuthorizeController.createNewTokenController
  );

router.route('/remove-token')
  .delete(
    AuthorizeController.removeRefreshTokenController
  );

export default router;
