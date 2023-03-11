const { getAnimeList, getRandomAnimeList, getPromosList, getGenresList } = require("../handlers/animeListsHandler");

const router = require("express").Router();

//gets the top recent popular upcoming season anime
router.get(`/api/animes`, getAnimeList);

//gets the anime promos
router.get(`/api/promos`, getPromosList);

//gets the anime genres themes demographics
router.get(`/api/genres`, getGenresList);

//gets a random anime category and the top anime of that category
//action adventure comedy drama sports shounen
router.get(`/api/animes/random`, getRandomAnimeList);

module.exports = router;
