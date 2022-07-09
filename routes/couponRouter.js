const Router = require("express")
const router = new Router()
const { Coupon } = require("../models/models")
const uuid = require('uuid')
const fs = require ("fs")
const path = require('path')

router.post("/", async (req, res) => {
  try {
    const { name, code, userId, shopId } = req.body 
    const { imgCoupon } = req.files 
    let fileName = uuid.v4() + '.jpg'
    imgCoupon.mv(path.resolve(__dirname, "..", "static", fileName))
    const coupon = await Coupon.create({name, code, img: fileName, userId, shopId})
    return res.json(coupon)
  } catch (err) {
    console.log(err.message)
  }
})

router.get("/", async (req, res) => {
  const { userId } = req.query
  const coupons = await Coupon.findAll({where: {userId}})
  return res.json(coupons)
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  const coupon = await Coupon.findOne({where: {id}})
  return res.json(coupon)
})

router.delete("/:id", async (req, res) => {
  const {id} = req.params
  const coupon = await Coupon.findOne({where: {id}})
  if (fs.existsSync(path.resolve(__dirname, "..", "static", coupon.img))) {
    fs.unlinkSync(path.resolve(__dirname, "..", "static", coupon.img))
  }
  await coupon.destroy({where: {id}})
  return res.json({message: 'Successfully deleted'})
})  

module.exports = router

