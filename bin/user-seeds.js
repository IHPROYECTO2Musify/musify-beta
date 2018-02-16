const dotenv = require('dotenv').load()
const mongoose = require("mongoose");
const firstUsers = require("../models/User");
const firstAds= require('../models/Ads');
const Instrument = require("../models/InstrumentsEnum");
const Experience = require("../models/ExpEnum");
const City= require('../models/CitiesEnum');
const dbURL= process.env.dbURL;

mongoose.connect(dbURL)
        .then(() => debug(`Connected to ${dbURL}`))
        .catch(e => console.log(e))
        
const myUsers = [
  {
    username: "Hanzo Shimada",
    password: "123",
    email: "ryuuga_waga@gmail.com",
    city: 'Madrid',
    description:
      "Lorem fistrum no te digo trigo por no llamarte Rodrigor va usté muy cargadoo diodeno. Hasta luego Lucas qué dise usteer pupita sexuarl. ",
    mainInstrument: "Bajo",
    otherInstrument: "Guitarra",
    experience: "Avanzado",
    imageUrl: "https//:imageurl.com",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  {
    username: "Enjuto Mojamuto",
    password: "456",
    email: "inten-neee@gmail.com",
    city: 'Madrid',
    description:
      "Qué dise usteer diodeno a wan va usté muy cargadoo ese hombree diodenoo fistro no te digo trigo por no llamarte Rodrigor. Ahorarr tiene musho peligro amatomaa llevame al sircoo quietooor. ",
    mainInstrument: "Guitarra",
    experience: "Intermedio",
    imageUrl: "https//:imageurl.com",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  {
    username: "Elvis Lennon",
    password: "789",
    email: "sergeantburger@fakemail.com",
    city: 'Madrid',
    description:
      "A gramenawer amatomaa se calle ustée ese pedazo de pupita te va a hasé pupitaa está la cosa muy malar. Te va a hasé pupitaa mamaar",
    mainInstrument: "Teclado",
    otherInstrument: "Ukelele",
    experience: "Profesional",
    imageUrl: "https//:imageurl.com",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
];

firstUsers.collection.drop();

firstUsers.create(myUsers, (err, user) => {
  if (err) {
    throw err;
  }
  user.forEach(u => {
    console.log(`user added ${u.username}`);
  });
  mongoose.connection.close();
});
