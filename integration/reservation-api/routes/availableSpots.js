import express from 'express'
import { pool } from '../database.js'

const router = express.Router()

/**
 * @swagger
 * /available_spots:
 *   get:
 *     summary: Get all available spots!
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
        const stmt = `
            SELECT 
                p.id AS parking_spot_id,
                p.vehicle_type,
                p.rate,
                p.lot
            FROM 
                parking_spot p
            LEFT JOIN 
                reservation r ON p.id = r.parking_spot_id
            WHERE 
                r.id IS NULL OR r.end_time < NOW();
        `
        const availableSpots = await pool.query(stmt)
        if(availableSpots.rows.length == 0) {
            return res.status(200).json([])
        }
        return res.status(200).json(availableSpots.rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
})

export default router