/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";

import { AnimeListContext } from "context/AnimeListContext";
import CircularProg from "utils/porgress/CircularProg";
import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

/**
 * Side bar containing the top anime
 * @returns
 */
const LeftSideBar = () => {
	const { topAnime } = useContext(AnimeListContext);
	const { getTopAnime } = useContext(AnimeListContext).actions;

	useEffect(() => {
		if (!topAnime) {
			getTopAnime();
		}
	}, []);

	//wait until the top anime are loaded
	if (!topAnime) {
		return <CircularProg />;
	}

	return (
		<Nav>
			<Title>Top Anime</Title>
			{topAnime.slice(0, 15).map((anime) => (
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
