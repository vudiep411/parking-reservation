import express from 'express'
import { pool } from '../database.js'

const router = express.Router()

/**
 * @swagger
 * /login:
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
        const result = await pool.query('SELECT * FROM users')
        
        console.log(email, password)
        res.status(200).json({ message: "Success" })
        
    } catch (error) {
        res.status(400).json({ error })
    }
})

export default router