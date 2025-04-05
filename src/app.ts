import {Request, Response} from 'express';
import express from 'express'
import { AuthRouter } from './routes/authRoutes';
import { UserRouter } from './routes/userRoutes';

const nonces = new Map<string, string>();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', AuthRouter)
app.use('/api', UserRouter)

export {nonces, app}

