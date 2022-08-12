import { Background, Synopsis, Title } from "styles/AnimeDetailsStyles";

import React from "react";

/**
 * Display the anime synopsis and background if there is one
 * @param {*} param0
 * @returns
 */
const AnimeSynopsis = ({ anime }) => {
	return (
		<Background>
			<Title>Synopsis: </Title>
			{anime.synopsis ? <Synopsis>{anime.synopsis}</Synopsis> : <Synopsis>Unavailable</Synopsis>}
			<Title>Background: </Title>
			{anime.background ? <Synopsis>{anime.background}</Synopsis> : <Synopsis>Unavailable</Synopsis>}
		</Background>
	);
};

export default AnimeSynopsis;
