import AnimeEpisodes from "./AnimeData/AnimeEpisodes";
import AnimeInformation from "./AnimeData/AnimeInformation";
import AnimeRecommendations from "./AnimeData/AnimeRecommendations";
import AnimeRelations from "./AnimeData/AnimeRelations";
import AnimeStats from "./AnimeData/AnimeStats";
import AnimeSynopsis from "./AnimeData/AnimeSynopsis";
import React from "react";
import styled from "styled-components";

const InformationSection = ({ anime, id }) => {
	return (
		<Wrapper>
			<First>
				<Image src={anime.images.jpg.image_url} />

				{/* ANIME INFO BELOW IMAGE */}
				<AnimeInformation anime={anime} />

				{/* ANIME STATS  */}
				<AnimeStats anime={anime} />
			</First>

			<Second>
				{/* ANIME SYNOPSIS  */}
				<AnimeSynopsis anime={anime} />

				{/* ANIME EPISODES */}
				<AnimeEpisodes anime={anime} id={id} />

				{/* ANIME RELATIONS  */}
				<AnimeRelations anime={anime} />

				{/* ANIME RECOMMENDATIONS */}
				<AnimeRecommendations anime={anime} id={id} />
			</Second>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 16px;
`;

const First = styled.div`
	display: flex;
	flex-direction: column;
`;

const Image = styled.img`
	width: 250px;
	height: 350px;
`;

const Second = styled.div`
	display: flex;
	flex-direction: column;
`;

export default InformationSection;
