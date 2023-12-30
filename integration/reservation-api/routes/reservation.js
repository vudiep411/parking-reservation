import express from 'express'
import { pool } from '../database.js'

const router = express.Router()


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
 *     responses:
 *       201:
 *         description: Sucess
 *       400:
 *         description: Invalid
 */
router.post('/', async (req, res) => {
    try {
        const { user_id, parking_spot_id, start_time, end_time, license_plate } = req.body
        // Check if end_time is in the past
        if (new Date(end_time) < new Date()) {
            return res.status(400).json({ message: 'End time cannot be in the past.' });
        }
        // Check if available
        const existSpot = await pool.query(`
            SELECT * FROM reservation
            WHERE parking_spot_id=$1
            AND(
            (start_time <= $2 AND end_time > $2) OR 
            (start_time < $3 AND end_time >= $3) OR 
            (start_time >= $2 AND end_time <= $3)
            )
        `, [parking_spot_id, start_time, end_time])

        if(existSpot.rows.length > 0) {
            return res.status(400).json({ message: 'Parking spot is already reserved for the requested time slot.' })
        }

        // Insert in database
        const reservation = await pool.query(
            `INSERT INTO reservation 
            (user_id, parking_spot_id, start_time, end_time, license_plate) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [user_id, parking_spot_id, start_time, end_time, license_plate]
        )
        if (reservation.rows.length > 0) {
            res.status(201).json({ message: 'Reservation successful', reservation: reservation.rows[0] });
        } else {
            res.status(500).json({ message: 'Failed to reserve parking spot' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router