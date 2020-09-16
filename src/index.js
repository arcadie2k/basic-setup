const express = require('express')

const PORT = process.env.PORT || 8080
const app = express()

app.get('/', (req, res) => {
  console.log('GOT IT!')
  res.send('App working just fine!')
})

app.listen(PORT, () => console.log(`APP RUNNING ON ** http://localhost:${ PORT } **`))