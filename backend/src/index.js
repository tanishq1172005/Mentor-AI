import {app} from './app.js'
import dotenv from 'dotenv'
import {connectDB} from './db/db.js'
import axios from 'axios'
import * as cheerio from "cheerio";

dotenv.config({
    path:'./.env'
})

connectDB()

const port = process.env.PORT || 5000;

import authRoute from './routes/user.route.js'
app.use('/api/v1/user',authRoute)

import docRoute from './routes/docs.route.js'
app.use('/api/v1/docs',docRoute)

import aiRoute from './routes/ai.route.js'
app.use('/api/v1/ai',aiRoute)

app.get('/doc',async(req,res)=>{
    const {data} =await axios.get(`https://react.dev/learn/thinking-in-react`)
    const $ = cheerio.load(data)
    const text = $("main").text().trim()
    res.json({text})
})

app.listen(port,()=>{
    console.log(`App listening on port:${port}`)
})
