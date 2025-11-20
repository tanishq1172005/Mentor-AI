import express from 'express'
import cors from 'cors'

export const app = express()

app.use(cors({
    origin:'https://mentor-ai-xi.vercel.app'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

