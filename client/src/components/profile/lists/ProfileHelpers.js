export const sortByTitle = (e, titleAsc, setTitleAsc, list, setList) => {
	e.preventDefault();

	titleAsc ? setList([...list.sort((a, b) => (b.title > a.title ? 1 : -1))]) : setList([...list.sort((a, b) => (a.title > b.title ? 1 : -1))]);
	setTitleAsc((current) => !current);
};

export const sortByScore = (e, scoreAsc, setScoreAsc, list, setList) => {
	e.preventDefault();

	scoreAsc ? setList([...list.sort((a, b) => b.score - a.score)]) : setList([...list.sort((a, b) => a.score - b.score)]);
	setScoreAsc((current) => !current);
};

export const sortByRating = (e, ratingAsc, setRatingAsc, list, setList) => {
	e.preventDefault();

	console.log(list);
	ratingAsc
		? setList([...list.sort((a, b) => parseInt(b.rating) - parseInt(a.rating))])
		: setList([...list.sort((a, b) => parseInt(a.rating) - parseInt(b.rating))]);
	setRatingAsc((current) => !current);
};
