import express from 'express'
import { pool } from '../database.js'

const router = express.Router()

/**
 * @swagger
 * /reservation/available_spots:
 *   get:
 *     summary: Get all available spots!
 *     tags: [Parking Reservation API]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   securityDefinitions:
 *     bearerAuth:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 */
router.get('/available_spots', async (req, res) => {
    try {
        const availableSpots = await pool.query("SELECT * FROM parking_spot WHERE status = True")
        if(availableSpots.rows.length == 0) {
            return res.status(200).json([])
        }
        return res.status(200).json(availableSpots.rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
})

/**
 * @swagger
 * /reservation:
 *   post:
 *     summary: reserve a parking spot
 *     tags: [Parking Reservation API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               parking_spot_id:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: time
 *               end_time:
 *                 type: string
 *                 format: time 
 *               license_plate:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucess
 *       400:
 *         description: Invalid
 */
router.post('/', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

export default router