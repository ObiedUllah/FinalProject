/**
 * Helper function to sort by ascending or descending for the title
 * @param {*} e
 * @param {*} titleAsc
 * @param {*} setTitleAsc
 * @param {*} list
 * @param {*} setList
 */
export const sortByTitle = (e, titleAsc, setTitleAsc, list, setList) => {
	e.preventDefault();

	titleAsc ? setList([...list.sort((a, b) => (b.title > a.title ? 1 : -1))]) : setList([...list.sort((a, b) => (a.title > b.title ? 1 : -1))]);
	setTitleAsc((current) => !current);
};

/**
 * helper function to sort by ascending or descending for the score
 * @param {*} e
 * @param {*} scoreAsc
 * @param {*} setScoreAsc
 * @param {*} list
 * @param {*} setList
 */
export const sortByScore = (e, scoreAsc, setScoreAsc, list, setList) => {
	e.preventDefault();

	scoreAsc ? setList([...list.sort((a, b) => b.score - a.score)]) : setList([...list.sort((a, b) => a.score - b.score)]);
	setScoreAsc((current) => !current);
};

/**
 * function to sort by ascending or descending for the rating
 * @param {*} e
 * @param {*} ratingAsc
 * @param {*} setRatingAsc
 * @param {*} list
 * @param {*} setList
 */
export const sortByRating = (e, ratingAsc, setRatingAsc, list, setList) => {
	e.preventDefault();

	console.log(list);
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
export const handleStatusChange = async (e, list, setList, anime, email, status, rating, completed) => {
	e.preventDefault();

	//if completed then do nothing
	if (completed && e.target.value === "completed") {
		return;
	}

	//update frontend list
	setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);

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
		//update the status in the database
		await fetch("/api/user/status", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	} catch (error) {
		alert("An error occured please try again or contact support");
	}
};

/**
 * removes an anime from the users completed/plan to watch list
 * @param {*} e
 */
export const handleRemoveFromList = async (e, list, setList, anime, email) => {
	e.preventDefault();

	//handle frontend first
	setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);

	//data to send to db
	const body = {
		email: email,
		data: { mal_id: anime.mal_id },
	};

	try {
		//delete anime item from db
		await fetch("/api/user/status", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	} catch (error) {
		alert("An error occured please try again or contact support");
	}
};
