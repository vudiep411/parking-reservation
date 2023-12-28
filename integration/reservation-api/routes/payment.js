import express from 'express'
import Stripe from 'stripe'

const router = express.Router()
const imageURL = "https://firebasestorage.googleapis.com/v0/b/chatapp-be9bd.appspot.com/o/ticket.jpg?alt=media&token=53170ce3-17e7-4421-b6ca-b84f99949f76"
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: test endpoint
 *     tags: [Parking Reservation API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: test sucessfully
 *       400:
 *         description: Invalid
*/
router.post('/', async (req, res) => {
    if(req.method === "POST") {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const { item, price } = req.body
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1LVnubDVcuoLrMkCA4Yj9S4S' }
                ],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item,
                            images: [imageURL]
                        },
                        unit_amount: price * 100
                    },
                    adjustable_quantity: {
                        enabled: false,
                    },
                    quantity: 1
                }],
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
                automatic_tax: {enabled: false},
            }
            const session = await stripe.checkout.sessions.create(params);
            return res.json({url: session.url})
        } catch (error) {
            console.log(error)
            return res.status(error.statusCode || 500).json(error.message);
        }
    }
})

export default router