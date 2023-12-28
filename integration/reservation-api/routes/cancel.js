import express from 'express'
import { pool } from '../database.js'

const router = express.Router()
/**
 * @swagger
 * /cancel:
 *   delete:
 *     summary: Cancel Reservation
 *     tags: [Parking Reservation API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservation_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: test sucessfully
 *       400:
 *         description: Invalid
*/
router.delete('/', async (req, res) => {
    try {
        const { reservation_id } = req.body

        // Check if reservation exists
        const checkRes = await pool.query(
            `SELECT * FROM reservation WHERE id=$1`, 
            [reservation_id])
        if(checkRes.rows.length === 0) {
            return res.status(404).json({ message: "Reservation not found." })
        }

        // Delete reservation
        await pool.query('DELETE from reservation WHERE id=$1', [reservation_id])
        return res.json({ success: true, message: 'Reservation canceled successfully.' });
            
    } catch (error) {
        console.error('Error canceling reservation:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router