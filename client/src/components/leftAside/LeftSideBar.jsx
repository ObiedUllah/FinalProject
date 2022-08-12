import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const LeftSideBar = () => {
	const [topAnime, setTopAnime] = useState(() => []);

	//get top animes
	useEffect(() => {
		const getTopAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/top/anime`).then((res) => res.json());
			setTopAnime(animeList.data.slice(0, 15));
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		setTimeout(() => getTopAnime(), 1000);
	}, []);

	return (
		<Nav>
			<Title>Top Anime</Title>
			{topAnime.map((anime) => (
				<Anchor to={`/anime/${anime.mal_id}`} key={anime.mal_id} rel="noreferrer">
					{anime.title}
				</Anchor>
			))}
		</Nav>
	);
};

const Nav = styled.nav`
	padding-left: 16px;
	padding-right: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h3`
	margin-top: 2vh;
	font-size: 24px;
	margin-bottom: 16px;
	text-align: center;
`;

const Anchor = styled(NavLink)`
	padding: 8px 16px;
	width: 70%;

	color: #313131;
	font-size: 16px;
	margin-bottom: 16px;

	background-color: #aaa;
	border-radius: 999px;
	text-decoration: none;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #888;
	}
`;

export default LeftSideBar;
