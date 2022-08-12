const router = require("express").Router();

const { getUsers, getUser, toggleFavorites, changeStatus, removeStatus } = require("../handlers/userHandlers");

//gets all the users
router.get(`/api/users`, (req, res) => getUsers(req, res));

//gets a user by their email
router.get(`/api/user/:email`, (req, res) => getUser(req, res));

//adds or removes an anime from the user's favorites list
router.put(`/api/user/favorite`, (req, res) => toggleFavorites(req, res));

//add or updates a anime status (completed/plan to watch) from the user's list
router.put(`/api/user/status`, (req, res) => changeStatus(req, res));

//removes an anime from the user's list
router.delete(`/api/user/status`, (req, res) => removeStatus(req, res));

module.exports = router;
