import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    if (await Item.find({item:newItem.item}).count() == 1){
      const existingItem = await Item.findOne({ item: newItem.item })
      if (newItem.price >= existingItem.price){
        await Item.updateOne({ _id: existingItem._id }, {$set: {price: newItem.price}});
      }
    }
    else{
      await newItem.save();
    }
    res.status(200).json({ message: "OK" });

  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find().sort({price:-1}).limit(5);
  await Item.deleteMany({})
  await Item.insertMany(items)
  res.status(200).json(items);
};

