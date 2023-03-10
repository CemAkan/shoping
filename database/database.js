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

//photo models
var photo = require("../models/photos/photo");

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

//photo models
var photoModel = photo(sequelize, Sequelize);

//--> Associations with category <--

// ITEM <-> CATEGORY
categoryModel.hasMany(itemModel, { foreignKey: "category_Id" });
itemModel.belongsTo(categoryModel, { foreignKey: "category_Id" });

//--> Associations with item <--

// LIKE <-> ITEM
itemModel.hasMany(likeModel, { foreignKey: "itemId" });
likeModel.belongsTo(itemModel, { foreignKey: "itemId" });

// ANNOUNCEMENTS <-> ITEM
itemModel.hasMany(announcementsModel, { foreignKey: "itemId" });
announcementsModel.belongsTo(itemModel, { foreignKey: "itemId" });

// SIMILAR ITEMS <-> ITEM
itemModel.hasMany(similarItemsModel, { foreignKey: "itemId" });
similarItemsModel.belongsTo(itemModel, { foreignKey: "itemId" });

// ITEM VARIANTS <-> ITEM
itemModel.hasMany(itemVariantsModel, { foreignKey: "itemId" });
itemVariantsModel.belongsTo(itemModel, { foreignKey: "itemId" });

//--> Associations with user <--

// CART <-> USER
userModel.hasMany(cartModel, { foreignKey: "phone" });
cartModel.belongsTo(userModel, { foreignKey: "phone" });

// LIKE <-> USER
userModel.hasMany(likeModel, { foreignKey: "phone" });
likeModel.belongsTo(userModel, { foreignKey: "phone" });

//CARD <-> USER
userModel.hasMany(cardModel, { foreignKey: "phone" });
cardModel.belongsTo(userModel, { foreignKey: "phone" });

//PERMISSIONS <-> USER
userModel.hasMany(permissionsModel, { foreignKey: "phone" });
permissionsModel.belongsTo(userModel, { foreignKey: "phone" });

//ADDRESS <-> USER
userModel.hasMany(addressModel, { foreignKey: "phone" });
addressModel.belongsTo(userModel, { foreignKey: "phone" });

//OLD ORDERS <-> USER
userModel.hasMany(oldOrdersModel, { foreignKey: "phone" });
oldOrdersModel.belongsTo(userModel, { foreignKey: "phone" });

//--> Associations with address <--

//DELIVERY DETAILS <-> ADDRESS
deliveryDetailsModel.hasMany(addressModel, { foreignKey: "distanceCategory" });
addressModel.belongsTo(deliveryDetailsModel, {
  foreignKey: "distanceCategory",
});

//--> Associations with photo <--

//ITEM <-> PHOTO
itemModel.hasMany(photoModel, { foreignKey: "itemId" });
photoModel.belongsTo(itemModel, { foreignKey: "itemId" });

//ANNOUNCEMENTS <-> PHOTO
announcementsModel.hasOne(photoModel, {
  foreignKey: "announcementId",
});
photoModel.belongsTo(announcementsModel, {
  foreignKey: "announcementId",
});

//--> Exporting variables <--
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
  photoModel,
};
