import React, { useEffect, useState } from "react";

import AnimeSlider from "components/home/AnimeSlider";
import styled from "styled-components";

const Home = () => {
	const [topAnime, setTopAnime] = useState([]);
	const [recentAnime, setRecentAnime] = useState([]);
	const [popularAnime, setPopularAnime] = useState([]);

	//get the top anime
	useEffect(() => {
		const getTopAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/top/anime`).then((res) => res.json());
			setTopAnime(animeList.data.slice(0, 24));
		};
		getTopAnime();
	}, []);

	//get recent anime uploaded
	useEffect(() => {
		const getRecentAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/watch/episodes`).then((res) => res.json());
			console.log(animeList.data);
			setRecentAnime(animeList.data.slice(0, 30));
		};
		getRecentAnime();
	}, []);

	//get ouplar anime currently
	useEffect(() => {
		const getPopularAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/watch/episodes/popular`).then((res) => res.json());
			setPopularAnime(animeList.data.slice(0, 30));
		};
		getPopularAnime();
	}, []);

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
