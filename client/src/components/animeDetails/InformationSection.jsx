import AnimeEpisodes from "./AnimeData/AnimeEpisodes";
import AnimeInformation from "./AnimeData/AnimeInformation";
import AnimeRecommendations from "./AnimeData/AnimeRecommendations";
import AnimeRelations from "./AnimeData/AnimeRelations";
import AnimeStats from "./AnimeData/AnimeStats";
import AnimeSynopsis from "./AnimeData/AnimeSynopsis";
import { isMobile } from "utils/porgress/mobile";
import styled from "styled-components";

/**
 * Third section of anime detail containing all the info of an anime
 * @param {*} param0
 * @returns
 */
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
				{!isMobile && <AnimeRecommendations anime={anime} id={id} />}
			</Second>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 16px;
	margin: 16px;
	border: 2px solid #aaa;
	border-radius: 2px;

	@media (max-width: 768px) {
		flex-wrap: wrap;
	}
`;

const First = styled.div`
	display: flex;
	flex-direction: column;
	width: 260px;

	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: -70px;
	}
`;

const Image = styled.img`
	width: 250px;
	height: 350px;
`;

const Second = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 100%;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export default InformationSection;
