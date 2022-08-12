// this is a helper function to send response back to client
const sendResponse = (res, status, data, message = "No message included.") => {
	return res.status(status).json({ status, data, message });
};

/**
 * changes a text to make a video more accurate to find on youtube
 * removes the "1: " in the beginning if there
 * removes the episode numbers if there
 * @param {*} str
 * @returns
 */
const transformText = (str) => {
	if (str.substring(0, 3).match(/\d+/g)) {
		return str.substring(3, str.length).replace(/ *\([^)]*\) */g, " ");
	}
	return str.replace(/ *\([^)]*\) */g, " ");
};

module.exports = {
	sendResponse,
	transformText,
};
