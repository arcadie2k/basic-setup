import express from 'express'

const init = async () => {
  const PORT = process.env.PORT || 8080
  const app = express()
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    console.log('GOT IT!')
    res.send('App working just fine!')
  })
  
  app.listen(PORT, () => console.log(`APP RUNNING ON ** http://localhost:${ PORT } **`))
}

init()
