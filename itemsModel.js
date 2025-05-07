const mongoose = require("mongoose");

//Question Two
//Create an Item model:
const itemsSchema = new mongoose.Schema({
    itemName: { type: String, require: true },
    discription: { type: String, require: true },
    locationFound: { type: String, default: "" },
    dateFound: { type: Date, default: 0},
    claimed: { type: Boolean, default: false }
},
    { Timestamp: true }
);

const Item = new mongoose.model("Item", itemsSchema);

module.exports = Item;