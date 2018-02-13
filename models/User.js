const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Instrument = require('./InstrumentsEnum');
const Experience= require('./ExpEnum');
const City= require('./CitiesEnum');

const userSchema = new Schema({
    username: {type: String, required: true }, 
    password: String,
    email: String,
    city: {type: String, enum: City, required: true},
    description: String,
    mainInstrument: { type: String, enum: Instrument, required: true }, 
    otherInstrument: { type: String, enum: Instrument}, 
    experience: { type: String, enum: Experience},
    imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=250&h=250" }
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
