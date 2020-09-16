import dotenv from 'dotenv'
import path from 'path'
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { PROD, PORT } from './utils'
import { exampleMiddleware } from './middleware/exampleMiddleware'
import { Post } from './entity/Post'

dotenv.config()

const init = async () => {
  // DB
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Post],
    logging: true,
    synchronize: true
  })

  // Express
  const app = express()
  
  // Middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(exampleMiddleware)

  // Routes
  app.get('/', async (req, res) => {
    const posts = await Post.find()
    res.json(posts)
  })
  
  // Production static files
  if(PROD) {
    app.use(express.static(path.resolve(__dirname, '../client/build')))
  }

  // Start app
  app.listen(PORT, () => console.log(`APP RUNNING ON ** http://localhost:${ PORT } **`))
}

init()
