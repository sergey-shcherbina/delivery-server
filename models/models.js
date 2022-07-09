const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true},
  phone: {type: DataTypes.STRING, unique: true},
  address: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "BUYER"} 
})
const Shop = sequelize.define("shop", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})
const Good = sequelize.define("good", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  price: {type: DataTypes.FLOAT, allowNull: false}
})
const Basket = sequelize.define("basket", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  finished: {type: DataTypes.BOOLEAN, defaultValue: false}
})
const BasketGood = sequelize.define("basket_good", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  number: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1}
})
const Coupon = sequelize.define("coupon", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  code: {type: DataTypes.STRING},
  img: {type: DataTypes.STRING, allowNull: false}
})
const Image = sequelize.define("image", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	img: {type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Basket)
Basket.belongsTo(User)

User.hasMany(Coupon)
Coupon.belongsTo(User)

Shop.hasMany(Coupon)
Coupon.belongsTo(Shop)

Shop.hasMany(Good)
Good.belongsTo(Shop)

Good.hasMany(BasketGood)
BasketGood.belongsTo(Good)

Basket.hasMany(BasketGood)
BasketGood.belongsTo(Basket)

Good.hasOne(Image)
Image.belongsTo(Good)

module.exports = {
  User,
  Shop,
  Good,
  Basket,
  BasketGood,
  Coupon,
  Image
}