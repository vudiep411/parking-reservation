import express from 'express'

const router = express.Router()

/**
 * @swagger
 * /test:
 *   get:
 *     summary: test endpoint
 *     tags: [Auth API]
 *     responses:
 *       201:
 *         description: test sucessfully
 *       400:
 *         description: Invalid
 */
router.get('/', async (req, res) => {
    try {
        console.log("Hello")
        res.json({hello: "Hello World!!"})
    } catch (error) {
        console.log(error)
    }
})

export default router