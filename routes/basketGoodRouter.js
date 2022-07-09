const Router = require("express")
const router = new Router()
const {BasketGood} = require ("../models/models")

router.post("/", async (req, res) => {
	const {number, basketId, goodId} = req.body
	const basket_good = await BasketGood.create({number, basketId, goodId})
  return res.json(basket_good)
})
router.get("/", async (req, res) => {
	const { basketId, goodId } = req.query
  const basket_goods = await BasketGood.findAll({where:{basketId, goodId}})
  return res.json(basket_goods)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const basket_good= await BasketGood.findOne({where: {id}}) 
	return res.json(basket_good)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
	await BasketGood.destroy({where: {id}})
  return res.json({message: 'Successfully deleted'})
})

module.exports = router