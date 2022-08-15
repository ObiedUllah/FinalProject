import { BsSearch } from "react-icons/bs";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Search input handling in the nav bar
 * @returns
 */
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
	 *  @param {*} event
	 */
	const showInput = async (event) => {
		display ? (search.length > 0 ? handleSearch(event) : setDisplay(false)) : setDisplay(true);
	};

	/**
	 * Will search for the most poppular anime with that search query
	 * @param {*} event
	 */
	const handleSearch = async (event) => {
		event.preventDefault();
		const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&order_by=score&sort=desc&sfw`).then((res) => res.json());
		navigate("searchList", { state: { data: temp.data } });
	};

	return (
		<SearchBox onSubmit={handleSearch}>
			{display && (
				<SearchInput
					type="search"
					placeholder="Search for an anime..."
					required
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
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
	font-size: 20px;
	margin-left: auto;

	display: block;
	width: 80%;
	padding: 14px;
	border-radius: 999px;
	background-color: #ccc;

	transition: 0.4s;

	::placeholder {
		color: inherit;
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
