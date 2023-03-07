//--> Requirements <--

//variables for database connection
var Database = require("../config/config");

//user models
var user = require("../models/user/user");
var cart = require("../models/user/cart");
var like = require("../models/user/likeList");
var address = require("../models/user/address");
var permissions = require("../models/user/permissions");
var card = require("../models/user/card");

//item models
var item = require("../models/items/item");
var category = require("../models/items/category");
var announcements = require("../models/items/announcements");
var itemVariants = require("../models/items/itemVariants");
var similarItems = require("../models/items/similarItems");

//delivery models
var deliveryDetails = require("../models/delivery/deliveryDetails");
var oldOrders = require("../models/delivery/oldOrders");

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

//user models
const userModel = user(sequelize, Sequelize);
const cartModel = cart(sequelize, Sequelize);
const categoryModel = category(sequelize, Sequelize);
const likeModel = like(sequelize, Sequelize);
const permissionsModel = permissions(sequelize, Sequelize);
const cardModel = card(sequelize, Sequelize);
const addressModel = address(sequelize, Sequelize);

//item models
const itemModel = item(sequelize, Sequelize);
const announcementsModel = announcements(sequelize, Sequelize);
const itemVariantsModel = itemVariants(sequelize, Sequelize);
const similarItemsModel = similarItems(sequelize, Sequelize);

//delivery models
const deliveryDetailsModel = deliveryDetails(sequelize, Sequelize);
const oldOrdersModel = oldOrders(sequelize, Sequelize);

//--> Associations <--

// CART <-> USER
userModel.hasMany(cartModel, { foreignKey: "phone" });
cartModel.belongsTo(userModel, { foreignKey: "phone" });

// ITEM <-> CATEGORY
categoryModel.hasMany(itemModel, { foreignKey: "category_Id" });
itemModel.belongsTo(categoryModel, { foreignKey: "category_Id" });

// LIKE <-> USER
userModel.hasMany(likeModel, { foreignKey: "phone" });
likeModel.belongsTo(userModel, { foreignKey: "phone" });

// LIKE <-> ITEM
itemModel.hasMany(likeModel, { foreignKey: "itemId" });
likeModel.belongsTo(itemModel, { foreignKey: "itemId" });

// CART <-> ITEM
itemModel.hasMany(cartModel, { foreignKey: "itemId" });
cartModel.belongsTo(itemModel, { foreignKey: "itemId" });

//--> exporting variables <--
module.exports = {
  Sequelize,
  sequelize,
  permissionsModel,
  announcementsModel,
  itemVariantsModel,
  similarItemsModel,
  cardModel,
  deliveryDetailsModel,
  oldOrdersModel,
  addressModel,
  userModel,
  cartModel,
  categoryModel,
  likeModel,
  itemModel,
};
