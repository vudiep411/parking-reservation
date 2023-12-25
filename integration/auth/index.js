import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from "dotenv"
import login_route from "./routes/login.js"
import register_route from "./routes/register.js"
import refresh_token_route from "./routes/refresh-token.js"
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { swaggerSpec, swaggerUIOptions } from './swagger.js'
import swaggerUi from 'swagger-ui-express'
import auth from "./middleware/auth.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT
const devUrl = process.env.DEV == 1 ? 'http://localhost:5001/docs/' : 'https://parking-reservation.vercel.app/docs/'

app.set('title', 'Auth API')
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

app.use('/login', login_route)
app.use('/register', register_route)
app.use('/refresh-token', refresh_token_route)

// Pass in JWT Token for Authorization Headers to get a user info form this endpoint
app.get('/test', auth, (req, res) => {
  return res.status(200).json({
      ...req.user,
      auth: true
  })
})

app.listen(PORT, () => console.log(`server started on ${PORT}`))