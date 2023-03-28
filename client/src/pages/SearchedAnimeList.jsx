/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import AnimeCard from "components/animeCard/AnimeCard";
import Pagination from "components/pagination/Pagination";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

/**
 * has a list of searched anime
 * @returns
 */
const SearchedAnimeList = () => {
	//gets the searched data that contain a popularity and sort by most popular and get only the first 24
	const { state } = useLocation();

	const [animeList, setAnimeList] = useState(() => null);
	const [currentPage, setCurrentPage] = useState(() => 1);

	useEffect(() => {
		let isCancelled = false;
		const fetchData = async () => {
			const response = await fetch(state.url + "page=" + currentPage);
			//if failure then throw an error
			if (response.status === 429) throw new Error(response.error);

			//if success then set data
			if (response.status === 200) {
				const data = await response.json();
				console.log(data);
				setAnimeList(data);
			}
		};
		if (!isCancelled) {
			fetchData();
		}
		return () => {
			isCancelled = true;
		};
	}, [currentPage, state]);

	const handleNumClick = (event) => {
		const newPage = parseInt(event.currentTarget.value);
		setCurrentPage(newPage);
	};

	if (animeList?.status === 500) {
		return (
			<Wrapper>
				<Title>Search Result:</Title>
				<Title>No Results Found</Title>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Title>Search Result:</Title>
			<SearchWrap>{animeList && animeList.data.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)}</SearchWrap>
			{animeList && (
				<Pagination pagination={{ ...animeList.pagination, has_previous_page: currentPage !== 1 }} handleNumClick={handleNumClick} />
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 2vh;
`;

const SearchWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 3vh;
`;

const Title = styled.h1`
	font-size: 36px;
	text-align: center;
`;

export default SearchedAnimeList;
