import express from 'express'
import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshtoken } from '../token.js'

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
        const { email, password } = req.body

        // Query user check if user exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if(!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate Token
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry for refresh token
        const token = generateAccessToken({ id: user.rows[0].id, email: email })
        const refreshToken = generateRefreshtoken({ id: user.rows[0].id, refreshToken: true })
        res.status(200).json({ token, refreshToken })

        // Save refresh token
        await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)', [user.rows[0].id, refreshToken, expiresAt]);

        // Save login record into a table
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const timestamp = new Date()
        const result = await pool.query("INSERT INTO login_record (user_id, time, ip_address) VALUES ($1, $2, $3) RETURNING id", [user.rows[0].id, timestamp, ipAddress])
        console.log(result.rows[0])
        return
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
})

export default router