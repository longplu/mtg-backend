///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config()

// pull PORT from .env, give default value of 3001
// pull DATABASE_URL from .env
const { PORT = 3001, DATABASE_URL } = process.env
// import express
const express = require("express")
// create application object
const app = express()
// import mongoose
const mongoose = require("mongoose")
// import middlware
const cors = require("cors")
const morgan = require("morgan")

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL)
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

///////////////////////////////
// MODELS
////////////////////////////////
const cardSchema = new mongoose.Schema({
    scryfall_id: { type: String, required: true },
    qty: { type: Number, required: true },
    name: String,
    prices_usd: Number,
    img_uris_small: { type: String, required: true },
    img_uris_normal: { type: String, required: true },
    purchase_uris_tcgplayer: String,
    type_line: String,
    mana_cost: String,
    oracle_text: String,
    cmc: Number,
  }, { timestamps: true});

const deckSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    cards: [cardSchema]
  }, { timestamps: true });


  
  const Deck = mongoose.model('Deck', deckSchema)

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world")
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))