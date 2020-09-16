import dotenv from 'dotenv'
import express from 'express'
import { createConnection } from 'typeorm'

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
    logging: true,
    synchronize: true,
    entities: ["./entity/*.ts"]
  })

  // Express
  const PORT = process.env.PORT || 8080
  const app = express()
  
  // Middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Routes
  app.get('/', (req, res) => {
    console.log('GOT IT!')
    res.send('App working just fine!')
  })
  
  // Start app
  app.listen(PORT, () => console.log(`APP RUNNING ON ** http://localhost:${ PORT } **`))
}

init()
