import * as  dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET as string
const DB_URL: string = process.env.DB_URL as string

export {JWT_SECRET, DB_URL}