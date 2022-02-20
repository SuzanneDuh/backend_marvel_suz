const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.query.title);
    const search = req.query.title;

    const response = await axios.get(
      `${apiUrl}/comics?apiKey=${process.env.MARVEL_API_KEY_SUZ}&title=${search}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("error.response", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
