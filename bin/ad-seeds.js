const mongoose = require("mongoose");
// const {
//   dbUrl
// } = require('../config');
const firstUsers = require("../models/User");
const firstAds = require("../models/Ads");
const Instrument = require("../models/InstrumentsEnum");
const Experience = require("../models/ExpEnum");
const City = require("../models/CitiesEnum");

mongoose
  .connect("mongodb://localhost/passport-auth-0118")
  .then(() => console.log("Conectado"));

const myAds = [
  {
    title: "Nuevo proyecto1",
    types: "Singer",
    description: "klhglhkgjkhk",
    styles: "Pop",
    mainInstrument: "Guitarra",
    creator_id: "5a81c8a2a3e84508689d8ebd",
    city: "Madrid",
    imageUrl: "imageurl",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

  {
    title: "Nuevo proyecto2",
    types: "Group",
    description: "klhglhkgjkhk",
    styles: "Rock",
    mainInstrument: "Guitarra",
    creator_id: "5a81c8a2a3e84508689d8ebd",
    city: "Barcelona",
    imageUrl: "imageurl",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

  {
    title: "Nuevo proyecto3",
    types: "Singer",
    description: "klhglhkgjkhk",
    styles: "Jazz",
    mainInstrument: "Guitarra",
    creator_id: "5a81c8a2a3e84508689d8ebd",
    city: "Alicante",
    imageUrl: "imageurl",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
];

firstAds.collection.drop();

firstAds.create(myAds, (err, ad) => {
  if (err) {
    throw err;
  }
  ad.forEach(a => {
    console.log(`user added ${a.title}`);
  });
  mongoose.connection.close();
});

