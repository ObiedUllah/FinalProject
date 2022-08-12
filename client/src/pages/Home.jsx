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
	const { topAnime, recentAnime, popularAnime } = useContext(AnimeListContext);
	const { setTop, setRecent, setPopular } = useContext(AnimeListContext).actions;

	useEffect(() => {
		if (!topAnime) {
			setTop();
		}
		if (!recentAnime) {
			setRecent();
		}
		if (!popularAnime) {
			setPopular();
		}
	}, []);

	//wait until all the anime are loaded
	if (!topAnime) {
		return <CircularProg />;
	}
	if (!recentAnime) {
		return <CircularProg />;
	}
	if (!popularAnime) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			<AnimeSlider list={topAnime} title={"Top Anime"} />
			<AnimeSlider list={recentAnime} title={"Recent Anime"} />
			<AnimeSlider list={popularAnime} title={"Popular Anime"} />
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
