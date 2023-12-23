import express from 'express'
import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../token.js'

const router = express.Router()


export default router