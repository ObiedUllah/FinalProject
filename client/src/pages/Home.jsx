import React, { useEffect, useState } from "react";

import AnimeSlider from "components/home/AnimeSlider";
import CircularProg from "utils/porgress/CircularProg";
import styled from "styled-components";

const Home = () => {
	const [topAnime, setTopAnime] = useState(() => []);
	const [recentAnime, setRecentAnime] = useState(() => []);
	const [popularAnime, setPopularAnime] = useState(() => []);

	//get the top anime
	useEffect(() => {
		const getTopAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/top/anime`).then((res) => res.json());
			console.log(animeList);
			setTopAnime(animeList.data.slice(0, 24));
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		setTimeout(() => getTopAnime(), 1000);
	}, []);

	//get recent anime uploaded
	useEffect(() => {
		const getRecentAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/watch/episodes`).then((res) => res.json());
			console.log(animeList);
			setRecentAnime(animeList.data.slice(0, 30));
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		setTimeout(() => getRecentAnime(), 1500);
	}, []);

	//get popular anime currently
	useEffect(() => {
		const getPopularAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/watch/episodes/popular`).then((res) => res.json());
			console.log(animeList);
			setPopularAnime(animeList.data.slice(0, 30));
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		setTimeout(() => getPopularAnime(), 2000);
	}, []);

	if (topAnime.length === 0) {
		return <CircularProg />;
	}
	if (!recentAnime.length === 0) {
		return <CircularProg />;
	}
	if (!popularAnime.length === 0) {
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
