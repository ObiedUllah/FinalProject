const router = require("express").Router();

const { getUsers, getUser } = require("../handlers/userHandlers");

router.get(`/api/users`, (req, res) => getUsers(req, res));
router.get(`/api/user/:email`, (req, res) => getUser(req, res));

module.exports = router;
