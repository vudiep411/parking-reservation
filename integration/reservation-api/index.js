import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from "dotenv"
import test_route from "./routes/test.js"
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { swaggerSpec, swaggerUIOptions } from './swagger.js'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const devUrl = process.env.DEV == 1 ? 'http://localhost:5000/docs/' : ''

app.set('title', 'Parking Reservation APIs')
app.use(bodyParser.json({ limit: "50mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUIOptions)
  )

app.get('/', (req, res) => {
    res.status(200).send(`<h4>Express API</h4><a href="${devUrl}" >Documentation</a>`)
})

app.use('/test', test_route)

app.listen(PORT, () => console.log(`server started on ${PORT}`))