//Question One
// Set up Node.js + Express + MongoDB

const expree = require("express");
const mongoose = require("mongoose");
const Item = require("./itemsModel");
const app = expree();
app.use(expree.json());

const PORT = process.env.PORT || 8000;

const MONGODB_URL = "mongodb+srv://adewaleproject:adewale@cluster0.gp86qlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGODB_URL).then(() => {
    console.log("Mongodb is connected...");
    app.listen(PORT, () => {
        console.log(`Server in running on port: ${PORT}`)
    });
});

app.get("/", async (req, res) => {
    res.status(200).json({message: "Welcome to lost & found system"})
})



// Question Three. Implement CRUD operations:

//To get all items
app.get("/all-items", async (req, res) => {
    
    const allItems = await Item.find()

    res.status(200).json({
        message: "All items",
        allItems
    });

});


//Add a found item
app.post("/found-item", async (req, res) => {
    const { itemName, discription, locationFound, dateFound, claimed } = req.body;
    
 if (!itemName) {
       return res.status(400).json({ massage: "Please enter the name of the item found" })
    }

    const newItem = new Item({ itemName, discription, locationFound, dateFound, claimed });
    await newItem.save()
     

    res.status(201).json({
        maessage: "Found item added successfully",
        newItem
    });
});


//View all unclaimed items
app.get("/unclaimed-items", async (req, res) => {
    
    const unclaimedItems = await Item.find({ claimed: false });

    res.status(200).json({
        message: "Unclaimed Items", 
        unclaimedItems
    })
});


//View one item by ID
app.get("/one-item/:id", async (req, res) => {
    const { id } = req.params;
    const oneItem = await Item.findById(id)
    if (!oneItem) {
        res.status(404).json({
            message: "Item not found"
        })
    }
    res.status(200).json({
        message: "Item found",
        oneItem
    });
});


//Update an item’s details
app.put("/update-item/:id", async (req, res) => {
    const { id } = req.params;
    const { itemName, discription, locationFound, dateFound, claimed } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
        id,
        { itemName, discription, locationFound, dateFound, claimed },
        { new: true }
    )

    res.status(201).json({
        message: "Item updated successfully",
        updatedItem
    });

});

//mark as claimed
app.get("/claimed-items", async (req, res) => {
    
    const claimedItems = await Item.find({ claimed: true });

    if (claimedItems) {
        res.status(200).json({
            message: "These Items are already claimed",
            claimedItems
        })
    }
});




//Delete old/irrelevant entries
app.delete("/delete-item/:id", async (req, res) => {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id)
    res.status(200).json("Item deleted")
})