const express = require('express')
require('dotenv').config();
const app = express()
const userRoutes = require("./routes/user")
const socialMediaRoutes = require("./routes/socialMedia")
const photoRoutes = require("./routes/photo")
const commentRoutes = require("./routes/comment")

app.use(express.json())
app.use('/users', userRoutes)
app.use('/socialmedias', socialMediaRoutes)
app.use('/photos', photoRoutes)
app.use('/comments', commentRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})