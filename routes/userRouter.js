const Router = require("express")
const router = new Router()
const jwt = require("jsonwebtoken")
const { User } = require ("../models/models")

const generateJwt = (id, email, phone, role) => {
	return jwt.sign(
		{id, email, phone, role},
		process.env.SECRET_KEY,
		{expiresIn: '24h'}  
	)
}

router.post("/auth", async (req, res) => {
	const {name, email, phone, address, role} = req.body
  // if (role === 'ADMIN') 
  let user, token
  if (email) {
    user = await User.findOne({where: {email}})
    if (user) {
      token = generateJwt(user.id, user.email, user.phone, user.role)
      return res.json({token})
    }
  }
  user = await User.findOne({where: {phone}})
  if (phone) {
    if (user) {
      token = generateJwt(user.id, user.email, user.phone, user.role)
      return res.json({token})
    }
  } 
  // && phone === '999999999'  
  if (email === 'shch@gmail.com') {
    user = await User.create({name, email, phone, address, role: "ADMIN"})  
  } else {
    user = await User.create({name, email, phone, address, role})
  }
  token = generateJwt(user.id, user.email, user.phone, user.role) 
  return res.json({token})
})

router.get("/auth", 
  (req, res, next) => {    
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(401).json({message: 'Fill out the form on the page "Shopping cart"'})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decoded
      next()
    } catch (err) {
      res.status(401).json({message: 'Fill out the form on the page "Shopping cart"'})
    } 
  },
  async (req, res) =>  {
    const token = generateJwt(req.user.id, req.user.email, req.user.name)
    return res.json({token})
  }
) 

module.exports = router
