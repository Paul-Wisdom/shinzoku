import * as  dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET as string
const DB_URL: string = process.env.DB_URL as string
const PORT: number = parseInt(process.env.PORT as string) || 3000
export {JWT_SECRET, DB_URL , PORT}