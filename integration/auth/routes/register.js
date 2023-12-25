import express from 'express'
import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshtoken } from '../token.js'

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
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const userId = newAccount.rows[0].id
        const token = generateAccessToken({ id: userId, email: email })
        const refreshToken = generateRefreshtoken({ id: userId, refreshToken: true })
        res.status(201).json({ id: userId, email, token, refreshToken })

        // Save refresh token
        await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)', [userId, refreshToken, expiresAt]);

         // Save login record into a table
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const timestamp = new Date()
        await pool.query("INSERT INTO login_record (user_id, time, ip_address) VALUES ($1, $2, $3) RETURNING id", [userId, timestamp, ipAddress])
        return
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error })
    }
})

export default router