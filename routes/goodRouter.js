const Router = require("express");
const router = new Router();
const path = require('path');
const { Good, Image } = require("../models/models")
const fs = require ("fs")

router.post("/", async (req, res) => {
  try {
    const { name, price, shopId } = req.body
    const good = await Good.create({name, price, shopId})
    return res.json(good)
  } catch (err) {
    console.log(err.message)
    // next(ApiError.badRequest(err.message))
  }
})

router.get("/", async (req, res) => {
  const { shopId } = req.query
  const goods = await Good.findAll({where: {shopId}})
  return res.json(goods)
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  const good = await Good.findOne({where: {id}})
  return res.json(good)
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name, price } = req.body
  const good = await Good.findOne({where: {id}})
  await good.update({name, price})
  return res.json(good)
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const image = Image.findOne({where: {goodId: id}})
  if (fs.existsSync(path.resolve(__dirname, "..", "static", image))) {
    fs.unlinkSync(path.resolve(__dirname, "..", "static", image))
  }
  await Good.destroy({where: {id}})
  return res.json({message: 'Successfully deleted'})
})  

module.exports = router