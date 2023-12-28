import express from 'express'
import { pool } from '../database.js'

const router = express.Router()

/**
 * @swagger
 * /parking_spots:
 *   get:
 *     summary: Get all spots!
 *     tags: [Parking Reservation API]
 *     responses:
 *       200:
 *         description: Success
 *   securityDefinitions:
 *     bearerAuth:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 */
router.get('/', async (req, res) => {
    try {
        const stmt = `SELECT * FROM parking_spot`
        const allSpots = await pool.query(stmt)
        if(allSpots.rows.length == 0) {
            return res.status(200).json([])
        }
        return res.status(200).json(allSpots.rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
})

export default router