const { uploadImage } = require("../handlers/uploadImageHandler");

const router = require("express").Router();

router.post(`/api/upload`, (req, res) => uploadImage(req, res));

module.exports = router;
