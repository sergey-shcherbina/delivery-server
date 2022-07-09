const Router = require("express")
const router = new Router()
const { Image } = require("../models/models")
const uuid = require('uuid')
const path = require('path')
// const checkRole = require("./checkRole")
const fs = require ("fs")

router.post("/", async (req, res) => {
  try {
    const { goodId } = req.body
    console.log(req.files)
    console.log(goodId)
    const { imgGood } = req.files
    let fileName = uuid.v4() + '.jpg'
    console.log(fileName)
    imgGood.mv(path.resolve(__dirname, "..", "static", fileName))
    const image = await Image.create({img: fileName, goodId})
    return res.json(image)
  } catch (err) {
    console.log(err.message)
  }
})

router.get("/:id", async (req, res) => {
	const {id} = req.params
	const image = await Image.findOne({where: {id}}) 
	return res.json(image)
})

router.delete("/:id", async (req, res) => {
	const {id} = req.params
  const image = await Image.findOne({where: {id}})
  if (fs.existsSync(path.resolve(__dirname, "..", "static", image.img))) {
    fs.unlinkSync(path.resolve(__dirname, "..", "static", image.img))
  }
  await Image.destroy({where: {id}})
  return res.json({message: 'Successfully deleted'})
})

module.exports = router