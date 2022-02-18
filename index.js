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

//+++++++++++++++++++tentative BARRE DE RECHERCHE ++++++====++++++++++++++...
// const charactersRoutes = require("./routes/characters");
// app.use(charactersRoutes);

// fin de la //+++++++++++++++++++tentative BARRE DE RECHERCHE ++++++====++++++++++++++...
// , mis en comm car  ca bug

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

//ma route personnage est nickel, maintenant fr route comics...
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

// route pour liste de comics contenant des caractères spé
app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/comics/5fc8ba1fdc33470f788f88b3?apiKey=${process.env.MARVEL_API_KEY_SUZ}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => console.log("Le serveur a bien demarré"));
// concernant le port, mis port 3100 ds env, env n'est pas sur github dc y aura pas de soucis qd je mettrai mon back sur herroku. ttes les infos  restera bien local.
