const { getListFromDb } = require("../handlers/animeListsHandler");

const router = require("express").Router();

//THE EXPECTED CATEGORIES ARE WRITTEN BELOW

//gets the top anime of all time
//top
router.get(`/api/top/:category`, getListFromDb);

//gets the recent animes
//recent
router.get(`/api/recent/:category`, getListFromDb);

//gets the current popular anime
//popular
router.get(`/api/popular/:category`, getListFromDb);

//gets the upcoming anime
//upcoming
router.get(`/api/upcoming/:category`, getListFromDb);

//gets the seasonal anime
//seasonal
router.get(`/api/seasonal/:category`, getListFromDb);

//gets the anime promos
//promos
router.get(`/api/promos/:category`, getListFromDb);

//gets the anime genres
//genres
router.get(`/api/genres/:category`, getListFromDb);

//gets the anime themes
//themes
router.get(`/api/themes/:category`, getListFromDb);

//gets the anime demographics
//demographics
router.get(`/api/demographics/:category`, getListFromDb);

//gets a random anime category and the top anime of that category
//action adventure comedy drama sports shounen
router.get(`/api/random/:category`, getListFromDb);

module.exports = router;
