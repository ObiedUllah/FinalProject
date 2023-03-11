/**
 * Helper function to sort by ascending or descending for the title
 * @param {*} event
 * @param {*} titleAsc
 * @param {*} setTitleAsc
 * @param {*} list
 * @param {*} setList
 */
export const sortByTitle = (event, titleAsc, setTitleAsc, list, setList) => {
	event.preventDefault();

	titleAsc ? setList([...list.sort((a, b) => (b.title > a.title ? 1 : -1))]) : setList([...list.sort((a, b) => (a.title > b.title ? 1 : -1))]);
	setTitleAsc((current) => !current);
};

/**
 * helper function to sort by ascending or descending for the score
 * @param {*} event
 * @param {*} scoreAsc
 * @param {*} setScoreAsc
 * @param {*} list
 * @param {*} setList
 */
export const sortByScore = (event, scoreAsc, setScoreAsc, list, setList) => {
	event.preventDefault();

	scoreAsc ? setList([...list.sort((a, b) => b.score - a.score)]) : setList([...list.sort((a, b) => a.score - b.score)]);
	setScoreAsc((current) => !current);
};

/**
 * function to sort by ascending or descending for the rating
 * @param {*} event
 * @param {*} ratingAsc
 * @param {*} setRatingAsc
 * @param {*} list
 * @param {*} setList
 */
export const sortByRating = (event, ratingAsc, setRatingAsc, list, setList) => {
	event.preventDefault();

	ratingAsc
		? setList([...list.sort((a, b) => parseInt(b.rating) - parseInt(a.rating))])
		: setList([...list.sort((a, b) => parseInt(a.rating) - parseInt(b.rating))]);
	setRatingAsc((current) => !current);
};

/*********************************************************************************************** */
/**
 * handlers for specific anime items
 */

/**
 * sets status of anime to plan to watch with no rating or completed with a rating
 * @param {*} event
 */
export const handleStatusChange = async (event, list, setList, anime, email, status, rating, completed, setLoading) => {
	event.preventDefault();

	setLoading("loading");

	//if completed then do nothing
	if (completed && event.target.value === "completed") {
		return;
	}

	//data to send to db
	let body = {
		email: email,
		data: {
			mal_id: anime.mal_id,
			title: anime.title,
			image: anime.image,
			score: anime.score,
			type: anime?.type,
			status: status,
			rating: rating,
		},
	};
	try {
		//updates the status in the database
		const response = await fetch("/api/user/status", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const result = await response.json();
		//updates frontend list
		if (result.status === 200) {
			setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);
			setLoading(null);
		}
	} catch (error) {
		alert("An error occured please try again or contact support");
	}
};

/**
 * removes an anime from the users completed/plan to watch list
 * @param {*} event
 */
export const handleRemoveFromList = async (event, list, setList, anime, email) => {
	event.preventDefault();

	//handle frontend first
	setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);

	//data to send to db
	const body = {
		email: email,
		data: { mal_id: anime.mal_id },
	};

	try {
		//deletes anime item from db
		await fetch("/api/user/status", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	} catch (error) {
		alert("An error occured please try again or contact support");
	}
};
