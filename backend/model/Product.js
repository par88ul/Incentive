const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  createdBy: String,
  email: String,
  lastUpdatedBy: String,
  password: String,
  role: String,
  savedPermission: [
    {
      permissionName: String,
        Create: Boolean,
        Read: Boolean,
        Update: Boolean,
        Delete: Boolean,
       
      },
  ],
  stats: Object
});

module.exports = mongoose.model("Product", productSchema);
