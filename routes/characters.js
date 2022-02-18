// tout mis en comm car ça me fait tout planter...

// const express = require("express");
// const router = express.Router();

// // Route pr récup  liste d'annonces, en f° de filtres
// // Si aucun filtre envoyé,  route renvoit ttes les annonces
// router.get("/characters", async (req, res) => {
//   try {
//     // création objet ds lequel on  sotcke les diffrt filtres
//     let filters = {};

//     if (req.query.name) {
//       filters.name = new RegExp(req.query.name, "i");
//     }

//     let sort = {};

//     let limit = Number(req.query.limit);

//     const characters = await Character.find(filters)
//       .populate({
//         path: "a",
//         select: "b",
//       })
//       .sort(sort);

//     //  ligne qui retourne  nb d'annonces trouvées en f° des filtres
//     const count = await Character.countDocuments(filters);

//     res.json({
//       count: count,
//       offers: characters,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;
