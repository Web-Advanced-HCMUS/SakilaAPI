import express from 'express';
import filmModel from '../../models/film.model.js';
import validator from './film.validator.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Film
 *    description: Everything about Film
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      Film:
 *          type: object
 *          required:
 *              - film_id
 *          properties:
 *              film_id:
 *                  type: integer
 *                  description: The auto-generated id of film
 *              title:
 *                  type: string
 *                  description: The title of film
 *              description:
 *                  type: string
 *                  description: The description of film
 *                  default: NULL
 *              release_year:
 *                  type: integer
 *                  description: The release year of film
 *                  default: NULL
 *              language_id :
 *                  type: integer
 *                  description: The language id of film
 *              original_language_id:
 *                  type: integer
 *                  description: The original language id of film
 *                  default: NULL
 *              rental_duration:
 *                  type: integer
 *                  description: The rental duration of film
 *                  default: 3
 *              rental_rate:
 *                  type: float
 *                  description: The rental rate of film
 *                  default: 4.99
 *              length:
 *                  type: integer
 *                  description: The length of film
 *                  default: NULL
 *              replacement_cost:
 *                  type: float
 *                  description: The replacement cost of film
 *                  default: 22.99
 *              rating:
 *                  type: string
 *                  description: The rating of film
 *                  enum:
 *                      - G
 *                      - PG
 *                      - PG-13
 *                      - R
 *                      - NC-17
 *                  default: G
 *              special_features:
 *                  type: string
 *                  description: The special features of film
 *                  set:
 *                      - Trailers
 *                      - Commentaries
 *                      - Deleted Scenes
 *                      - Behind the Scenes
 *                  default: NULL
 *              last_update:
 *                  type: string
 *                  description: The last updated time of film
 *                  default: current_timestamp()
 *          example:
 *              film_id: 1
 *              title: ACADEMY DINOSAUR
 *              description: A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies
 *              release_year: 2006
 *              language_id : 1
 *              original_language_id: null
 *              rental_duration: 6
 *              rental_rate: 0.99
 *              length: 86
 *              replacement_cost: 20.99
 *              rating: PG
 *              special_features: Deleted Scenes,Behind the Scenes
 *              last_update: 2006-02-14T22:03:42.000Z
 *      CreateNewFilm:
 *          type: object
 *          required:
 *              - title
 *              - release_year
 *              - language_id
 *              - rental_duration
 *              - rental_rate
 *              - replacement_cost
 *          properties:
 *              title:
 *                  type: string
 *                  description: The title of film
 *              release_year:
 *                  type: integer
 *                  description: The release year of film
 *                  default: NULL
 *              language_id:
 *                  type: integer
 *                  description: The language id of film
 *              rental_duration:
 *                  type: integer
 *                  description: The rental duration of film
 *                  default: 3
 *              rental_rate:
 *                  type: float
 *                  description: The rental rate of film
 *                  default: 4.99
 *              replacement_cost:
 *                  type: float
 *                  description: The replacement cost of film
 *                  default: 22.99
 *          example:
 *              title: ACADEMY DINOSAUR
 *              release_year: 2006
 *              language_id : 1
 *              rental_duration: 6
 *              rental_rate: 0.99
 *              replacement_cost: 20.99
 *      UpdateFilm:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: The title of film
 *              description:
 *                  type: string
 *                  description: The description of film
 *                  default: NULL
 *              release_year:
 *                  type: integer
 *                  description: The release year of film
 *                  default: NULL
 *              language_id :
 *                  type: integer
 *                  description: The language id of film
 *              original_language_id:
 *                  type: integer
 *                  description: The original language id of film
 *                  default: NULL
 *              rental_duration:
 *                  type: integer
 *                  description: The rental duration of film
 *                  default: 3
 *              rental_rate:
 *                  type: float
 *                  description: The rental rate of film
 *                  default: 4.99
 *              length:
 *                  type: integer
 *                  description: The length of film
 *                  default: NULL
 *              replacement_cost:
 *                  type: float
 *                  description: The replacement cost of film
 *                  default: 22.99
 *              rating:
 *                  type: string
 *                  description: The rating of film
 *                  enum:
 *                      - G
 *                      - PG
 *                      - PG-13
 *                      - R
 *                      - NC-17
 *                  default: G
 *              special_features:
 *                  type: string
 *                  description: The special features of film
 *                  set:
 *                      - Trailers
 *                      - Commentaries
 *                      - Deleted Scenes
 *                      - Behind the Scenes
 *                  default: NULL
 *          example:
 *              title: ACADEMY DINOSAUR
 *              description: A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies
 *              release_year: 2006
 *              language_id : 1
 *              original_language_id: null
 *              rental_duration: 6
 *              rental_rate: 0.99
 *              length: 86
 *              replacement_cost: 20.99
 *              rating: PG
 *              special_features: Deleted Scenes,Behind the Scenes
 */

/**
 * @swagger
 *  /api/films:
 *      get:
 *          tags:
 *              - Film
 *          summary: Get all films
 *          responses:
 *              '200':
 *                  description: Successfully get all films
 *                  content:
 *                      'application/json':
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Film'
 *              '500':
 *                  description: Internal server error
 */
router.get('/', async function (req, res){
    const list = await filmModel.findAll();
    res.json(list);
})

/**
 * @swagger
 *  /api/films/{film_id}:
 *      get:
 *          tags:
 *              - Film
 *          summary: Get a film with given film_id
 *          parameters:
 *              - name: film_id
 *                in: path
 *                description: the ID of film
 *                required: true
 *                type: string
 *          responses:
 *              '200':
 *                  description: Successfully delete a film
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Film'
 *              '400':
 *                  description: Invalid payload
 *              '500':
 *                  description: Internal server error
 */
router.get('/:filmID', async function(req, res){
    const film = await filmModel.findWithID(req.params.filmID);

    res.status(201).json(film);
})

/**
 * @swagger
 *  /api/films:
 *      post:
 *          tags:
 *              - Film
 *          summary: Add new film
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateNewFilm'
 *          responses:
 *              '200':
 *                  description: Successfully insert a film
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Film'
 *              '400':
 *                  description: Invalid payload
 *              '500':
 *                  description: Internal server error
 */
router.post('/', validator.validateFilm(), validator.filmValidation, async function(req, res){
    let film = req.body;

    const ret = await filmModel.add(film);
    const addedFilm = await filmModel.findWithID(ret[0]);

    res.status(201).json(addedFilm);
})

/**
 * @swagger
 *  /api/films/{film_id}:
 *      put:
 *          tags:
 *              - Film
 *          summary: Update a film with given film_id
 *          parameters:
 *              - name: film_id
 *                in: path
 *                description: the ID of film
 *                type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateFilm'
 *          responses:
 *              '200':
 *                  description: Successfully update a film
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Film'
 *              '400':
 *                  description: Invalid payload
 *              '500':
 *                  description: Internal server error
 */
router.put('/:filmID', validator.validateFilm(), validator.filmValidation, async function(req, res){
    let film = req.body;

    await filmModel.update(req.params.filmID, film);
    const updatedFilm = await filmModel.findWithID(req.params.filmID);
    res.status(201).json(updatedFilm);
})

/**
 * @swagger
 *  /api/films/{film_id}:
 *      delete:
 *          tags:
 *              - Film
 *          summary: Delete a film with given film_id
 *          responses:
 *              '200':
 *                  description: Successfully delete a film
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/APIResponse'
 *              '400':
 *                  description: Invalid payload
 *              '500':
 *                  description: Internal server error
 *          parameters:
 *              - name: film_id
 *                in: path
 *                description: the ID of film
 *                required: true
 *                type: string
 */
router.delete('/:filmID', async function(req, res){
    await filmModel.delete(req.params.filmID);

    res.status(201).json({
        message: 'Successfully delete film with id ' + `${req.params.filmID}`
    });
})

export default router;
