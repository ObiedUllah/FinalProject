import { Container, Information, InformationData, InformationLabel, Title } from "styles/AnimeDetailsStyles";

import React from "react";

/**
 * Displays the stats for an anime
 * @param {*} param0
 * @returns
 */
const AnimeStats = ({ anime }) => {
	return (
		<Information style={{ marginTop: "20px" }}>
			<Title>Stats:</Title>

			<Container>
				<InformationLabel>Score: </InformationLabel>
				<InformationData>{anime.score}</InformationData>
			</Container>

			<Container>
				<InformationLabel>Scored By: </InformationLabel>
				<InformationData>{anime.scored_by}</InformationData>
			</Container>

			<Container>
				<InformationLabel>Popularity: </InformationLabel>
				<InformationData>{anime.popularity}</InformationData>
			</Container>

			<Container>
				<InformationLabel>Ranking: </InformationLabel>
				<InformationData>{anime.rank}</InformationData>
			</Container>
		</Information>
	);
};

export default AnimeStats;
