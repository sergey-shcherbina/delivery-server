const Router = require("express")
const router = new Router()
const { Shop } = require ("../models/models")

router.post("/", async (req, res) => {
  const {name} = req.body
  const shop = await Shop.create({name})
  return res.json(shop)
})

router.get("/", async (req, res) => {
  const shops = await Shop.findAll()
  return res.json(shops)
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  const shop = await Shop.findOne({where: {id}})
  return res.json(shop)
})

router.put("/:id", async (req, res) => {
  const {id} = req.params
  const {name} = req.body
  const shop = await Shop.findOne({where: {id}})
  await shop.update({name})
  return res.json(shop)
 })

router.delete("/:id", async (req, res) => {
  const {id} = req.params
  await Shop.destroy({where: {id}})
  return res.json({message: 'Successfully deleted'})
})  

module.exports = router