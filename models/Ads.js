const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = require('./StylesEnum');
const Instrument = require ('./InstrumentsEnum');
const City = require ('./CitiesEnum'); 

const adsSchema = new Schema({
  title: { type: String, required: true },
  types: { type: String, required: true}, //anuncio filtrado por artista o grupo
  description: { type: String, required: true },
  styles: { type: String, enum: Types, required: false }, // para indicar con tags el estilo musical 
  mainInstrument: { type: String, enum: Instrument, required: true },
  creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: String, enum: City, required: true},
  //imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=650&h=250" },

  audio: { type: String, default: "https:// any link" },
  video: { type: String, default: "https:// any link" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

module.exports = mongoose.model('Ads', adsSchema); 