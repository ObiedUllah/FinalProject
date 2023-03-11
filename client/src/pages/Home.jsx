/* eslint-disable react-hooks/exhaustive-deps */

import { AnimeListContext } from "context/AnimeListContext";
import AnimeSlider from "components/home/AnimeSlider";
import CircularProg from "utils/porgress/CircularProg";
import styled from "styled-components";
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

	return (
		<Wrapper>
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
