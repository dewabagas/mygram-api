const express = require('express')
require('dotenv').config();
const app = express()
const userRoutes = require("./routes/user")

app.use(express.json())
app.use('/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })