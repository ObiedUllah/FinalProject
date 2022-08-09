const yt = require("youtube-search-without-api-key");

//get helper functions
const { sendResponse, transformText } = require("./helperFunctions.js");

/**
 * get a anime theme from youtube with a streing from the frontend
 * make the title one that can be searched without the episodes
 *
 * @param {*} req
 * @param {*} res
 */
const getVideo = async (req, res) => {
	try {
		const title = transformText(req.params.string);
		console.log(title);
		const videos = await yt.search(title);

		sendResponse(res, 200, videos[0], "video Retrieved");
	} catch (error) {
		console.log(error);
		sendResponse(res, 500, null, "Server Error");
	}
};

/**
 * uses api to download video
 * finds video first
 * then converts video to mp3 and downloads it
 * @param {*} req
 * @param {*} res
 */
const downloadMp3 = async (req, res) => {
	try {
		//get video first
		const title = transformText(req.body.video);
		const videos = await yt.search(title);
		const video = videos[0];

		//get video id
		const videoId = video.id.videoId;

		//downloads video through api
		const download = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
			method: "GET",
			headers: {
				"x-rapidapi-key": process.env.API_KEY,
				"x-rapidapi-host": process.env.API_HOST,
			},
		});

		const response = await download.json();
		response.status === "ok"
			? sendResponse(res, 200, { song_title: response.title, song_link: response.link }, "video Retrieved")
			: sendResponse(res, 404, null, "video not retrieved");
	} catch (error) {
		sendResponse(res, 500, null, "Server Error");
	}
};

module.exports = { getVideo, downloadMp3 };
