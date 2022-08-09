// this is a helper function to send response
const sendResponse = (res, status, data, message = "No message included.") => {
	return res.status(status).json({ status, data, message });
};

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
