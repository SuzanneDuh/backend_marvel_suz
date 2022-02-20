MARVEL_API_KEY_SUZ = Ex8Teuq234rtnn2A;

const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const res = require("express/lib/response");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(formidable());

// pr ne pas avoir à mettre à chaque fois l'URL de l'API en entier
const apiUrl = "https://lereacteur-marvel-api.herokuapp.com";
// const apiUrl =
//   "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=YOUR_API_KEY";

// mongoose.connect("mongodb://localhost/marvel-suz");

// permet de verifier que  serveur ok qd hebergement sur heroku
app.get("/", (req, res) => {
  res.status(200).json({ message: "bienvenue Suzon sur ton back" });
});

// route personnages
app.get("/characters", async (req, res) => {
  try {
    // requete axiosà l'API MAarvel du reacteur
    // decla api URL plus haut dc pas besoin de mettre tte l'URL en entier
    //mon API KEY marvel est dans fichier .env NPO mettre .env ds .gitignore...
    const response = await axios.get(
      `${apiUrl}/characters?apiKey=${process.env.MARVEL_API_KEY_SUZ}`
    );
    // nb:qd je mets le back sur heroku, NPO de bien mettre ma cleAPI ds les variables d'environnements++++
    // et pr herroku faut aussi rajouter   "start": "node index.js"
    // du coup c ok ça marche sur herroku et netlify
    // https://apollo.lereacteur.io/course/602e4c6b3b125b00174a188f/61cf12a15202dc0018a7fb1a
    // https://apollo.lereacteur.io/course/602e4c6b3b125b00174a188f/61cf12a15202dc0018a7fb1d
    //
    // ci dessous, pr test avec postman localhost3000. Ok+ s'affiche bien ds postman!!
    // console.log(response.data);
    // res.json("Ok");
    // maintenant ci dessous, avec response.data : yes c ok , tte la route s'affiche bien ds postman.
    res.json(response.data);
    // dc ok j' arrive a recup des données de l'api et les renvoyer
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// route pr liste de comics
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/comics?apiKey=${process.env.MARVEL_API_KEY_SUZ}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// route pour liste de comics contenant un perso spé
app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY_SUZ}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// fonction search pour les comics - ca ne f° pas...
app.get("/comics", async (req, res) => {
  try {
    let newurl = `${apiUrl}/comics?apiKey=${process.env.MARVEL_API_KEY_SUZ}`;

    if (req.query.search) {
      newurl = `${apiUrl}&title=${req.query.search}`;
    }

    const response = await axios.get(newurl);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// route character spe id
app.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY_SUZ}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => console.log("Le serveur a bien demarré"));
// concernant le port, mis port 3100 ds env, env n'est pas sur github dc y aura pas de soucis qd je mettrai mon back sur herroku. ttes les infos  restera bien local.
