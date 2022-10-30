/**
 * @swagger
 * /actor/get-list:
 *   get:
 *     summary: Danh sách diễn viên
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: orderBy
 *         in: query
 *         description: Sort theo start_time/stop_time/test_time/dc_volt/batt_curr
 *       - name: sort
 *         in: query
 *         description: asc/desc
 *       - name: fromDate
 *         in: query
 *         description: Format YYYY-MM-DD
 *       - name: toDate
 *         in: query
 *         description: Format YYYY-MM-DD
 *       - name: page
 *         in: query
 *         description: Vị trí trang số
 *       - name: limit
 *         in: query
 *         description: Số phần tử 1 trang
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           area:
 *             type: Array
 *           zone:
 *             type: Array
 *           province:
 *             type: Array
 *           branch:
 *             type: Array
 *           nameDev:
 *             type: Array
 *         example: {
 *           "area": ['MN', MB'],
 *           "zone": ['V4', 'V5'],
 *           "province": ['HCM', 'DNG'],
 *           "branch": ['BTHT3', 'BTHT1'],
 *           "nameDev": ['NTGP00901PWEN1U'],
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
 * /actor/add-one:
 *   post:
 *     summary: Thêm mới một diễn viên
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           first_name:
 *             type: String
 *           last_name:
 *             type: String
 *         example: {
 *           "first_name": "Huynh",
 *           "last_name": "Le"
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
