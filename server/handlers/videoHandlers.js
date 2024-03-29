const fetch = require("node-fetch");
const yt = require("youtube-search-without-api-key");
const ytdl = require("ytdl-core");
const { google } = require("googleapis");

const youtube = google.youtube({
	version: "v3",
	auth: process.env.YOUTUBE_API_KEY,
});

//helper functions
const { sendResponse, transformText } = require("./helperFunctions.js");

/**
 * Will search for all videos with that query using youtube api from google
 * @param {*} query
 * @returns
 */
const searchVideos = async (query) => {
	const response = await youtube.search.list({
		part: "id,snippet",
		q: query,
	});
	return response.data.items;
};

/**
 * get a anime theme from youtube with a string from the client
 *
 * @param {*} req
 * @param {*} res
 */
const getVideo = async (req, res) => {
	try {
		//gets video first
		const title = transformText(req.params.string);
		const videos = await searchVideos(title);

		sendResponse(res, 200, "https://www.youtube.com/watch?v=" + videos[0].id.videoId, "video Retrieved");
	} catch (error) {
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
		//gets video first
		const title = transformText(req.body.video);
		const videos = await searchVideos(title);

		//gets video id
		const videoId = videos[0].id.videoId;

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

/**
 * Will get an mp3 audio from a youtube link
 * searches for youtube link by looking at params which contains theme title
 * converts the url to a audio and sends it back to as response
 * @param {*} req
 * @param {*} res
 */
const getMp3Audio = async (req, res) => {
	//gets video first
	const title = transformText(req.params.string);
	const videos = await searchVideos(title);

	const videoId = videos[0].id.videoId;

	// Set the response headers to indicate that this is an audio file
	res.setHeader("Content-Type", "audio/mpeg");
	res.setHeader("Accept-Ranges", "bytes");
	res.setHeader("Cache-Control", "public, max-age=31536000");

	// Use ytdl-core to extract the audio from the YouTube URL
	const audio = ytdl("https://www.youtube.com/watch?v=" + videoId, {
		filter: "audioonly",
		quality: "highestaudio",
	});

	// Pipe the audio stream to the response
	audio.pipe(res);
};

module.exports = { getVideo, downloadMp3, getMp3Audio };
