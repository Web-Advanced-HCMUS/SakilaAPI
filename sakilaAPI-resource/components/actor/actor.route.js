import express from 'express';
import actorModel from '../../models/actor.model.js';
import validator from './actor.validator.js';
import {genSign} from "../../utils/sign.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Actor
 *    description: Everything about Actor
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Actor:
 *          type: object
 *          required:
 *              - actor_id
 *          properties:
 *              actor_id:
 *                  type: number
 *                  description: The auto-generated id of actor
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              last_update:
 *                  type: string
 *          example:
 *              actor_id: 1
 *              first_name: CHRIS
 *              last_name: HEMSWORTH
 *              last_update: 2006-02-14T21:34:33.000Z
 *      CreateActor:
 *          type: object
 *          required:
 *              - first_name
 *              - last_name
 *          properties:
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *          example:
 *              first_name: CHRIS
 *              last_name: HEMSWORTH
 *      UpdateActor:
 *          type: object
 *          properties:
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *          example:
 *              first_name: CHRIS
 *              last_name: HEMSWORTH
 *      APIResponse:
 *          type: object
 *          properties:
 *              code:
 *                  type: number
 *              message:
 *                  type: string
 *          example:
 *              code: 201
 *              message: message that describe the response
 */

/**
 * @swagger
 *  /api/actors:
 *      get:
 *          tags:
 *              - Actor
 *          summary: Get all actors
 *          responses:
 *              '200':
 *                  description: Successfully get all actors
 *                  content:
 *                      'application/json':
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Actor'
 *              '500':
 *                  description: Internal server error
 */
router.get('/', async function (req, res){
    const list = await actorModel.findAll();

    res.status(200).json(list);
})

/**
 * @swagger
 *  /api/actors/{actor_id}:
 *      get:
 *          tags:
 *              - Actor
 *          summary: Get actor with given ID
 *          parameters:
 *              - in: path
 *                name: actor_id
 *                description: the ID of actor
 *                required: true
 *                type: string
 *          responses:
 *              '200':
 *                  description: Successful API
 *                  content:
 *                      'application/json':
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Actor'
 *              '500':
 *                  description: Internal server error
 */
router.get('/:actorID', async function (req, res){
    const actor = await actorModel.findWithID(req.params.actorID);

    res.status(200).json(actor);
})

/**
 * @swagger
 *  /api/actors:
 *      post:
 *          tags:
 *              - Actor
 *          summary: Add new actor
 *          requestBody:
 *              description: Information of actor
 *              required: true
 *              content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/CreateActor'
 *          responses:
 *              '201':
 *                  description: Successfully insert a users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Actor'
 *              '400':
 *                  description: Invalid payload
 *              '500':
 *                  description: Internal server error
 */
router.post('/', validator.validateUpdateActor(), validator.actorValidation,async function(req, res){
    //req._routeWhitelists.body = ['first_name'];  Just show the 'first_name'
    let actor = req.body;

    const ret = await actorModel.add(actor);
    const addedActor = await  actorModel.findWithID(ret[0]);

    res.status(201).json(addedActor);
})

/**
 * @swagger
 *  /api/actors/{actor_id}:
 *      put:
 *          tags:
 *              - Actor
 *          summary: Update an actor with given ID
 *          requestBody:
 *              description: Information of actor
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateActor'
 *          responses:
 *              '201':
 *                  description: Successful updated actor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Actor'
 *              '400':
 *                  description: Invalid payload
 *              '500':
 *                  description: Internal server error
 */
router.put('/:actorID', validator.actorValidation, async function(req, res){
    let actor = req.body;

    await actorModel.update(req.params.actorID, actor);
    const updatedActor = await  actorModel.findWithID(req.params.actorID);

    res.status(201).json(updatedActor);
})

/**
 * @swagger
 *  /api/actors/{actor_id}:
 *      delete:
 *          tags:
 *              - Actor
 *          summary: Delete an actor
 *          responses:
 *              '200':
 *                  description: Successful deleted actor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/APIResponse'
 *              '400':
 *                  description: Invalid actor_id
 *              '500':
 *                  description: Internal server error
 *      parameters:
 *          - name: actor_id
 *            in: path
 *            description: the ID of actor
 *            required: true
 *            type: string
 */
router.delete('/:actorID', async function(req, res){
    await actorModel.delete(req.params.actorId);

    res.status(201).json({
        code: 201,
        message: 'Successfully delete actor with id ' + `${req.params.actorID}`
    });
})

export default router;
