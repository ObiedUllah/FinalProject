const router = require("express").Router();

const { getUsers, getUser, toggleFavorites, changeStatus, removeStatus } = require("../handlers/userHandlers");

router.get(`/api/users`, (req, res) => getUsers(req, res));
router.get(`/api/user/:email`, (req, res) => getUser(req, res));
router.put(`/api/user/favorite`, (req, res) => toggleFavorites(req, res));
router.put(`/api/user/status`, (req, res) => changeStatus(req, res));
router.delete(`/api/user/status`, (req, res) => removeStatus(req, res));

module.exports = router;
