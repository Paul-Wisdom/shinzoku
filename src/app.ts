import {Request, Response} from 'express';
import express from 'express'
import { AuthRouter } from './routes/authRoutes';
import { UserRouter } from './routes/userRoutes';
import { CharacterRouter } from './routes/characterRoutes';

const nonces = new Map<string, string>();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/characters', CharacterRouter);

export {nonces, app}

