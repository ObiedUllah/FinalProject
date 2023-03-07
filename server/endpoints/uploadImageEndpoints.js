const { uploadImage } = require("../handlers/uploadImageHandler");

const router = require("express").Router();

//uploads image onto cloudinary, adds image url to mongodb
router.post(`/api/upload`, uploadImage);

module.exports = router;
