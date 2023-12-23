import express from 'express'

const router = express.Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Login endpoint
 *     tags: [Auth API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucess
 *       400:
 *         description: Invalid
 */
router.post('/', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const phone_number = req.body.phone_number

        console.log(email, password, name, phone_number)
        res.status(200).json({ message: "Success" })
        
    } catch (error) {
        res.status(400).json({ error })
    }
})

export default router