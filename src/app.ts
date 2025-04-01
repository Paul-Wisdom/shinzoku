import {Request, Response} from 'express';
import express from 'express'
import { AuthRouter } from './routes/authRoutes';

const nonces = new Map<string, string>();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', AuthRouter)

export {nonces, app}

