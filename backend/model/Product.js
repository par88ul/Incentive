const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  createdBy: String,
  email: String,
  lastUpdatedBy: String,
  password: String,
  role: String,
  permission: Object,
  parameterPermission:Object,
  stats: Object
});

module.exports = mongoose.model("Product", productSchema);
