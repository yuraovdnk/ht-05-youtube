import express from 'express'
import 'dotenv/config'
const app = express()
import cors from 'cors'
import bodyParser from "body-parser";
import {runDb} from "./repositories/db";
import {usersRoute} from "./routes/users-route";
import {authRoute} from "./routes/auth-route";
import {bloggersRoute} from "./routes/bloggers-route";
import {postsRoute} from "./routes/posts-route";
import {commentsRoute} from "./routes/comments-route";
import {testingRoute} from "./routes/testing-route";


const port = process.env.PORT || 5000
app.set('trust proxy', true)

app.use(cors())

app.use(bodyParser.json())

app.use('/users',usersRoute)
app.use('/auth',authRoute)
app.use('/bloggers',bloggersRoute)
app.use('/posts',postsRoute)
app.use('/comments',commentsRoute)
app.use('/testing',testingRoute)


export async function start(){
    await runDb()
    app.listen(port,()=>{
        console.log(`App listening on port ${port}`)
    })
}
start()
