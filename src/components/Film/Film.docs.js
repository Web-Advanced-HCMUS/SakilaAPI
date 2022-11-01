/**
 * @swagger
 * /film/get-all:
 *   get:
 *     summary: Danh sách tất cả các Phim
 *     tags:
 *       - Film
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /film/get-by-name/{name}:
 *   get:
 *     summary: Tìm phim theo tên
 *     tags:
 *       - Film
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         type: string
 *         description: Tên của bộ phim
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /film/add-one:
 *   post:
 *     summary: Thêm mới một bộ phim
 *     tags:
 *       - Film
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           title:
 *             type: String
 *           description:
 *             type: String
 *           releaseYear:
 *             type: Number
 *           languageId:
 *             type: Number
 *           originalLanguageId:
 *             type: Number
 *           rentalDuration:
 *             type: Number
 *           length:
 *             type: Number
 *           replacementCost:
 *             type: Number
 *           rating:
 *             type: String
 *           specialFeatures:
 *             type: Array
 *         example: {
 *           "title": "AAAAAA",
 *           "description": "AAAAA",
 *           "releaseYear": 2022,
 *           "languageId": 1,
 *           "originalLanguageId": 1,
 *           "rentalDuration": 10,
 *           "length": 10,
 *           "replacementCost": 1.9,
 *           "rating": "",
 *           "specialFeatures": []
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /film/delete-one/{id}:
 *   delete:
 *     summary: Xóa một bộ phim bằng id
 *     tags:
 *       - Film
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID của phim
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /film/update-one/{id}:
 *   put:
 *     summary: Chỉnh sửa thông tin một bộ phim
 *     tags:
 *       - Film
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID của phim
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           title:
 *             type: String
 *           description:
 *             type: String
 *           releaseYear:
 *             type: Number
 *           languageId:
 *             type: Number
 *           originalLanguageId:
 *             type: Number
 *           rentalDuration:
 *             type: Number
 *           length:
 *             type: Number
 *           replacementCost:
 *             type: Number
 *           rating:
 *             type: String
 *           specialFeatures:
 *             type: Array
 *         example: {
 *           "title": "AAAAAA",
 *           "description": "AAAAA",
 *           "releaseYear": 2022,
 *           "languageId": 1,
 *           "originalLanguageId": 1,
 *           "rentalDuration": 10,
 *           "length": 10,
 *           "replacementCost": 1.9,
 *           "rating": "",
 *           "specialFeatures": []
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
