/* eslint-disable react-hooks/exhaustive-deps */

import styled from "styled-components";

import { AnimeListContext } from "context/AnimeListContext";
import AnimePicks from "components/home/AnimePicks";
import AnimeSlider from "components/home/AnimeSlider";
import CircularProg from "utils/porgress/CircularProg";
import { useContext } from "react";

/**
 * Shows three AnimeSliders with anime that are always at the top, popular or recent
 * @returns
 */
const Home = () => {
	const { topAnimes, recentAnimes, popularAnimes, randomGenreAnimes } = useContext(AnimeListContext);

	//wait until all the anime are loaded
	if (!topAnimes || !recentAnimes || !popularAnimes || !randomGenreAnimes) {
		return <CircularProg />;
	}

	const animePicks = popularAnimes
		.filter((anime) => {
			return (
				anime.mal_id === 21 ||
				anime.mal_id === 16498 ||
				anime.mal_id === 11061 ||
				anime.mal_id === 1575 ||
				anime.mal_id === 22319 ||
				anime.mal_id === 1735
			);
		})
		.sort((a, b) => a.mal_id - b.mal_id);

	return (
		<Wrapper>
			<AnimePicks animePicks={animePicks} />
			<AnimeSlider list={topAnimes} title={"Top Anime"} />
			{popularAnimes.length > 8 && <AnimeSlider list={popularAnimes} title={"Popular Anime"} />}
			{recentAnimes.length > 8 && <AnimeSlider list={recentAnimes} title={"Recent Anime"} />}
			<AnimeSlider list={randomGenreAnimes.data} title={randomGenreAnimes.name} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
`;

export default Home;
