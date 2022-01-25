const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
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

const deckSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    cards: [cardSchema]
  }, { timestamps: true });


  
  const Deck = mongoose.model('Deck', deckSchema)