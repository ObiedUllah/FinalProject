/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";

import { AnimeListContext } from "context/AnimeListContext";
import AnimeSlider from "components/home/AnimeSlider";
import CircularProg from "utils/porgress/CircularProg";
import styled from "styled-components";

/**
 * Shows three AnimeSliders with anime that are always at the top, popular or recent
 * @returns
 */
const Home = () => {
	const { topAnime, recentAnime, popularAnime, shonenAnime } = useContext(AnimeListContext);
	const { getTopAnimes, getRecentAnimes, getPopularAnimes, getShonenAnimes } = useContext(AnimeListContext).actions;

	useEffect(() => {
		if (!topAnime) {
			getTopAnimes();
		}
		if (!recentAnime) {
			getRecentAnimes();
		}
		if (!popularAnime) {
			getPopularAnimes();
		}
		if (!shonenAnime) {
			getShonenAnimes();
		}
	}, []);

	//wait until all the anime are loaded
	if (!topAnime || !recentAnime || !popularAnime || !shonenAnime) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			<AnimeSlider list={topAnime} title={"Top Anime"} />
			{popularAnime.length > 8 && <AnimeSlider list={popularAnime} title={"Popular Anime"} />}
			{recentAnime.length > 8 && <AnimeSlider list={recentAnime} title={"Recent Anime"} />}
			<AnimeSlider list={shonenAnime} title={"Shounen Anime"} />
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
