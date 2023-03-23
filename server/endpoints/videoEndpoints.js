const router = require("express").Router();

const { getVideo, downloadMp3, getMp3Audio } = require("../handlers/videoHandlers");

//gets a video from youtube by searching for a title with a string from frontend
router.get(`/api/video/:string`, getVideo);

//converts youtube video to mp3
router.post(`/api/convert-mp3`, downloadMp3);

//converts youtube video to mp3
router.get(`/api/audio/:string`, getMp3Audio);

module.exports = router;
