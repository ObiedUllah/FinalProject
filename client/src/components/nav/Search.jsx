import React, { useContext } from "react";

import { BsSearch } from "react-icons/bs";
import { SearchContext } from "context/SearchContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
	//display if search bar should appear
	const [display, setDisplay] = useState(() => false);

	//search data
	const [search, setSearch] = useState("");

	//be able to go to the search anime list page
	const navigate = useNavigate();

	/**
	 * Shows or hides the input box depending on if the user clicks on the search icon
	 * if the search input has text then make the icon into a submit search
	 *  @param {*} e
	 */
	const showInput = async (e) => {
		display ? (search.length > 0 ? handleSearch(e) : setDisplay(false)) : setDisplay(true);
	};

	/**
	 * Will search for the 12 most poppular anime with that search query
	 * @param {*} e
	 */
	const handleSearch = async (e) => {
		e.preventDefault();
		const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&order_by=score&sort=asc&limit=12`).then((res) => res.json());
		navigate("searchList", { state: { data: temp.data } });
	};

	return (
		<SearchBox onSubmit={handleSearch}>
			{display && (
				<SearchInput type="search" placeholder="Search for an anime..." required value={search} onChange={(e) => setSearch(e.target.value)} />
			)}
			<Icon size="30px" onClick={showInput} />
		</SearchBox>
	);
};

const SearchBox = styled.form`
	display: flex;
	width: 30vw;
	padding: 0px 15px;
`;

const SearchInput = styled.input`
	appearance: none;
	background: none;
	outline: none;
	border: none;

	display: block;
	width: 90%;
	padding: 16px;
	border-radius: 999px;
	background-color: #eee;

	transition: 0.4s;

	::placeholder {
		color: #888;
	}

	&:focus,
	&:valid {
		background-color: #313131;
		color: #fff;
	}
`;

const Icon = styled(BsSearch)`
	cursor: pointer;
	margin: 15px;
	margin-left: auto;
`;

export default Search;
