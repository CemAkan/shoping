//--> Requirements <--
var user = require("../models/user/user");
var cart = require("../models/user/cart");
var category = require("../models/items/category");
var like = require("../models/user/likeList");
var item = require("../models/items/item");
var Database = require("../config/config");

//--> Database Connection <--
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  Database.development.database,
  Database.development.username,
  Database.development.password,
  {
    host: Database.development.host,
    dialect: Database.development.dialect,
  }
);

//--> Sequelize to Models <--
const userModel = user(sequelize, Sequelize);
const cartModel = cart(sequelize, Sequelize);
const categoryModel = category(sequelize, Sequelize);
const likeModel = like(sequelize, Sequelize);
const itemModel = item(sequelize, Sequelize);

//--> Associations <--

// CART <-> USER
userModel.hasMany(cartModel, { foreignKey: "userId" });
cartModel.belongsTo(userModel, { foreignKey: "userId" });

// ITEM <-> CATEGORY
categoryModel.hasMany(itemModel, { foreignKey: "category_Id" });
itemModel.belongsTo(categoryModel, { foreignKey: "category_Id" });

// LIKE <-> USER
userModel.hasMany(likeModel, { foreignKey: "userId" });
likeModel.belongsTo(userModel, { foreignKey: "userId" });

// LIKE <-> ITEM
itemModel.hasMany(likeModel, { foreignKey: "itemId" });
likeModel.belongsTo(itemModel, { foreignKey: "itemId" });

// CART <-> ITEM
itemModel.hasMany(cartModel, { foreignKey: "itemId" });
cartModel.belongsTo(itemModel, { foreignKey: "itemId" });

//--> export <--
module.exports = {
  Sequelize,
  sequelize,
  userModel,
  cartModel,
  categoryModel,
  likeModel,
  itemModel,
};
