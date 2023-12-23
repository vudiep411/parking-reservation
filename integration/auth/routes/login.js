import express from 'express'
import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../token.js'

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
        const token = generateAccessToken({ id: user.rows[0].id, email: email })
        return res.status(200).json({ token })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
})

export default router