const dotenv = require('dotenv').load()
const mongoose = require("mongoose");
const firstUsers = require("../models/User");
const firstAds = require("../models/Ads");
const Instrument = require("../models/InstrumentsEnum");
const Experience = require("../models/ExpEnum");
const City = require("../models/CitiesEnum");
const dbURL= process.env.dbURL;

mongoose.connect(dbURL)
  .then(() => console.log("Conectado"));


const myAds = [
  {
    title: "Nuevo proyecto de Ska busca Trompetista",
    types: "Singer",
    description: "Somos una nueva formación de Madrid y queremos tratar de lanzar una nueva ola de ska nosotros solos, porque tenemos más valor que Jon Snow cargando él solo contra el ejército de los Bolton. Necesitamos un/a trompetista valiente, que se sienta capaz de retar a Louis Armstrong a un duelo de metales y salir victorioso. Somos 4 integrantes hasta ahora y ensayamos cerca de Moratalaz.",
    styles: "Ska",
    mainInstrument: "Trompeta",
    creator_id: "5a81c8a2a3e84508689d8ebd",
    city: "Madrid",
    //imageUrl: "imageurl",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

  {
    title: "Cosmic Treadmills busca Guitarrista y Teclista",
    types: "Group",
    description: "¡Buenas! Somos los Cosmic Treadmills, un grupo nuevo de rock progresivo con temática en torno a Flash y sus viajes en el tiempo. Necesitamos un teclista versátil y atrevido, que no se limite sólo a tocar notas largas en un Hammond; y uno de estos guitarristas que acaban logrando que se te caiga la mandíbula al escucharle. Queremos empezar a componer pronto así que si te ves reflejado en una de las dos descripciones, escríbemos!",
    styles: "Rock",
    mainInstrument: "Guitarra",
    city: "Barcelona",
    //imageUrl: "imageurl",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

  {
    title: "Sanchez & The Mortys busca Cantante",
    types: "Singer",
    description: " *burp - Ven a tocar con nosotros, Morty, ven a - burp - unirte a nuestra banda experimental fusión. Haremos viajes interestelares, tocaremos jazz ácido digno de Primus o Mr Bungle y - burp - reinaremos en toda la galaxia. Ahora en serio, tenemos un local cerca de SS de los Reyes y necesitamos un  cantante innovador",
    styles: "Jazz",
    mainInstrument: "Guitarra",
    city: "Madrid",
    //imageUrl: "imageurl",
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

