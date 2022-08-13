/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { GenresListContext } from "context/GenresListContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Genres = () => {
	const { genresList, themesList, demographicsList } = useContext(GenresListContext);
	const { getGenres, getThemes, getDemos } = useContext(GenresListContext).actions;

	//be able to go to the search anime list page
	const navigate = useNavigate();

	useEffect(() => {
		if (!genresList) {
			getGenres();
		}
		if (!themesList) {
			getThemes();
		}
		if (!demographicsList) {
			getDemos();
		}
	}, []);

	const handleClick = async (e, index) => {
		e.preventDefault();
		const temp = await fetch(`https://api.jikan.moe/v4/anime?genres=${index}&order_by=score&sort=desc`).then((res) => res.json());
		navigate("/searchList", { state: { data: temp.data } });
	};

	// wait until data is loaded
	if (!genresList || !themesList || !demographicsList) {
		<CircularProg />;
	}

	return (
		<Wrapper>
			<Title>Genres: </Title>
			<Data>
				{genresList &&
					genresList.map((item) => {
						return (
							<Item key={item.mal_id} onClick={(e) => handleClick(e, item.mal_id)}>
								{item.name}
							</Item>
						);
					})}
			</Data>
			<Title>Themes: </Title>
			<Data>
				{themesList &&
					themesList.map((item) => {
						return (
							<Item key={item.mal_id} onClick={(e) => handleClick(e, item.mal_id)}>
								{item.name}
							</Item>
						);
					})}
			</Data>
			<Title>Demographics: </Title>
			<Data>
				{demographicsList &&
					demographicsList.map((item) => {
						return (
							<Item key={item.mal_id} onClick={(e) => handleClick(e, item.mal_id)}>
								{item.name}
							</Item>
						);
					})}
			</Data>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 2vh;
`;

const Title = styled.h1`
	font-size: 24px;
	margin: 2vh 0px;
`;

const Data = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const Item = styled.button`
	flex: 0 0 15%;
	height: 50px;
	border-radius: 3px;
	margin: 2px;
	border: none;
	background-color: #999;
	cursor: pointer;

	transition: 0.4s;

	&:hover {
		transform: scale(1.15);
		background-color: #666;
	}
`;

export default Genres;
