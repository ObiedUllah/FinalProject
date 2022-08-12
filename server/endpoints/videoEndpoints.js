const router = require("express").Router();

const { getVideo, downloadMp3 } = require("../handlers/videoHandlers");

//gets a video from youtube by searching for a title with a string from frontend
router.get(`/api/video/:string`, (req, res) => getVideo(req, res));

//converts youtube video to mp3
router.post(`/api/convert-mp3`, (req, res) => downloadMp3(req, res));

module.exports = router;
