require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use("/api/user", require("./routes/userRouter"))
app.use("/api/shop", require("./routes/shopRouter"))
app.use("/api/good", require("./routes/goodRouter"))
app.use("/api/basket", require("./routes/basketRouter"))
app.use("/api/basket_good", require("./routes/basketGoodRouter"))
app.use("/api/coupon", require("./routes/couponRouter"))
app.use("/api/image", require("./routes/imageRouter"))

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()