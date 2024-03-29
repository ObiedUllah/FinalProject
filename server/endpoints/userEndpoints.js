const router = require("express").Router();

const {
	createUser,
	getUsers,
	getUser,
	toggleFavorites,
	changeStatus,
	removeStatus,
	addSongToList,
	removeSongFromList,
} = require("../handlers/userHandlers");

router.post(`/api/user`, createUser);

//gets all the users
router.get(`/api/users`, getUsers);

//gets a user by their email
router.get(`/api/user/:email`, getUser);

//adds or removes an anime from the user's favorites list
router.put(`/api/user/favorite`, toggleFavorites);

//adds or updates a anime status (completed/plan to watch) from the user's list
router.put(`/api/user/status`, changeStatus);

//removes an anime from the user's list
router.patch(`/api/user/status`, removeStatus);

//adds a song to the users song list
router.put(`/api/user/song`, addSongToList);

//remove a song to the users song list
router.patch(`/api/user/song/:id`, removeSongFromList);

module.exports = router;
