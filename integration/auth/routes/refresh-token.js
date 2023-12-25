import express from 'express'
import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../token.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh token endpoint to retrieve new access token
 *     tags: [Auth API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Invalid
 */
router.post('/', async (req, res) => {
    try {        
        const { refresh_token } = req.body
        jwt.verify(refresh_token, process.env.SECRET);
    
        const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [refresh_token]);
    
        // Verify if token is in database
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
    
        // Verify if refresh token is expired
        const expire_at = new Date(result.rows[0].expire_at)
        const current_date = new Date()
        if(current_date.getTime() > expire_at.getTime()) {
            return res.status(401).json({ error: 'Refresh Token Expried' });
        }
    
        const accessToken = generateAccessToken({id: result.rows[0].user_id })
        return res.status(200).json({ accessToken })
    } catch (error) {
        res.status(403).json({ error: 'Invalid Token' });
    }

})


export default router