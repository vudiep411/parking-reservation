import express from 'express'
import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../token.js'

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
        const { email, password, name, phone_number } = req.body

        // Check if user already exist
        const result = await pool.query('SELECT (email) FROM users WHERE email = $1', [email])
        if(result.rows.length > 0) {
            return res.status(409).json({ message: "User already exist" })
        }
        
        // Hash password
        const hashPassword = await bcrypt.hash(password, 12)

        // Insert new user
        const newAccount = await pool.query(
            'INSERT INTO users (name, phone_number, email, password) VALUES ($1, $2, $3, $4) RETURNING id', 
            [name, phone_number, email, hashPassword]
        )

        // Generate Access Token
        const userId = newAccount.rows[0].id
        const token = generateAccessToken({
            id: userId,
            email: email,
        })
        
        return res.status(201).json({ id: userId, email, token })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error })
    }
})

export default router