///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env

const express = require("express")

const app = express()

const mongoose = require("mongoose")

const cors = require("cors")
const morgan = require("morgan")



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATABASE CONNECTION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect(DATABASE_URL)

mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MODELS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const cardSchema = new mongoose.Schema({
    scryfall_id: { type: String, required: true },
    qty: { type: Number, required: true },
    // name: String,
    // prices_usd: Number,
    // img_uris_small: { type: String, required: true },
    // img_uris_normal: { type: String, required: true },
    // purchase_uris_tcgplayer: String,
    // type_line: String,
    // mana_cost: String,
    // oracle_text: String,
    // cmc: Number,
  }, { timestamps: true});

const deckSchema = new mongoose.Schema({
    // user: String, //{type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //uId: String,
    name: String,
    cards: [cardSchema]
  }, { timestamps: true });
  
const Deck = mongoose.model('Deck', deckSchema)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("hello world")
})

// INDEX ROUTE
app.get("/decks", async (req, res) => {
  try {
    res.json(await Deck.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// app.get("/decks/:id", async (req, res) => {
//   console.log((Deck.findById(req.params.id)))
//   try {
//     res.json(await Deck.findById(req.params.id));
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// CREATE ROUTE
app.post("/decks", async (req, res) => {
  try {
    res.json(await Deck.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});


// DELETE DECK ROUTE
app.delete("/decks/:id", async (req, res) => {
  try {
    res.json(await Deck.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// // DELETE CARD ROUTE
// app.delete("/decks/:id/card/:linkId", async (req, res) => {
//   console.log(req.params)
//   try {
//     res.json(await Deck.findByIdAndUpdate(req.params.id, {$pull: {"cards": { _id: req.params.linkId }}}))
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// UPDATE ROUTE
app.put("/decks/:id", async (req, res) => {
  console.log(req.body)
  try {
    const deck = await Deck.findById(req.params.id)
    deck.cards.push(req.body)
    await deck.save()
    res.json(deck);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // LISTENER
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))