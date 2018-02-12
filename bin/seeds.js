const mongoose = require("mongoose");
const firstUsers = require("../models/User");
const firstAds = require("../models/Ads");

//const Instrument = require('../models/Instruments');
const Experience= require('../models/Exp');
const City= require('./Cities');

mongoose.connect("mongodb://localhost/passport-auth-0118").then(() => console.log("Conectado"));

const myAds = [
  { title: 'John', 
  types: 'Singer',
  description: 'klhglhkgjkhk',
  styles : 'pop',
  instrument: 'guitar',
  city: 'Madrid',
  imageUrl: 'imageurl',
  }, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

  { title: 'U2', 
  types: 'Group',
  description: 'klhglhkgjkhk',
  styles : 'Rock',
  instrument: 'guitar',
  city: 'Barcelona',
  imageUrl: 'imageurl',
  }, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

  { title: 'Peter', 
  types: 'Singer',
  description: 'klhglhkgjkhk',
  styles : 'Jazz',
  instrument: 'guitar',
  city: 'Alicante',
  imageUrl: 'imageurl',
  }, {
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
  ad.forEach((a) => {
      console.log(`user added ${a.title}`)
  });
  mongoose.connection.close();
});