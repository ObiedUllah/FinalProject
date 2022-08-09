const router = require("express").Router();

const { getVideo, downloadMp3 } = require("../handlers/videoHandlers");

router.get(`/api/video/:string`, (req, res) => getVideo(req, res));

router.post(`/api/convert-mp3`, (req, res) => downloadMp3(req, res));

module.exports = router;
