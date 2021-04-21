const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Importing the user model
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const adventurerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  description: String,
  race: String,
  strength: Number,
  agility: Number,
  durability: Number,
  intelligence: Number,
  cost: Number
});


// create a virtual paramter that turns the default _id field into id
adventurerSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
adventurerSchema.set('toJSON', {
  virtuals: true
});

// create a model for adventurers
const Adventurer = mongoose.model('Adventurer', adventurerSchema);

// get a user's adventurers
router.get("/", validUser, async (req, res) => {
  try {
    let adventurers = await Adventurer.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');

    res.send(adventurers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get all adventurers
router.get("/all", async (req, res) => {
  try {
    let adventurers = await Adventurer.find({}).sort({
      created: -1
    }).populate('user');

    res.send(adventurers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/", validUser, async (req, res) => {
  const adventurer = new Adventurer({
    user: req.user,
    name: req.body.name,
    description: req.body.description,
    race: req.body.race,
    strength: req.body.strength,
    agility: req.body.agility,
    durability: req.body.durability,
    intelligence: req.body.intelligence,
    cost:req.body.cost
  });
  try {
    await adventurer.save();
    res.send(adventurer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/:id", validUser, async (req, res) => {
  try {
    let adventurer = await Adventurer.findOne({
      _id: req.params.id
    });
    adventurer.name=req.body.name;
    adventurer.description=req.body.description;
    adventurer.race=req.body.race;
    adventurer.strength = req.body.strength;
    adventurer.agility = req.body.agility;
    adventurer.durability = req.body.durability;
    adventurer.intelligence = req.body.intelligence;
    adventurer.cost = req.body.cost;
    if (adventurer.name==="" || adventurer.name===null) {
      console.log("Frick you, I'm not falling for that again.");
      adventurer.name="Frick you, I'm not falling for that again.";
    }
    adventurer.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", validUser, async (req, res) => {
  try {
    await Adventurer.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Adventurer,
  routes: router,
}
