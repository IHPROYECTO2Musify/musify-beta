const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = require('./StylesEnum');
const Instrument = require('./InstrumentsEnum');
const Category= require('./TypesEnum');
const City = require ('./CitiesEnum'); 

const adsSchema = new Schema({
  title: { type: String, required: true },
  types: { type: String, /*enum: Category,*/ required: true}, 
  description: { type: String, required: true },
  styles: { type: String, enum: Types, required: false }, 
  mainInstrument: { type: String, enum: Instrument, required: true },
  creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: String, enum: City, required: true},
  imgUrl: { type: String, default: "https://i.ytimg.com/vi/5vs0DTRdD8A/hqdefault.jpg"},

  audio: { type: String, default: "https:// any link" },
  video: { type: String, default: "https:// any link" },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

module.exports = mongoose.model('Ads', adsSchema); 