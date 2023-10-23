import { BsSearch } from "react-icons/bs";
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
		navigate("searchList", {
			state: { url: `https://api.jikan.moe/v4/anime?q=${search}&order_by=scored_by&sort=desc&sfw&` },
		});
	};

	return (
		<SearchBox onSubmit={handleSearch}>
			<SearchInput
				type="search"
				placeholder="Search for an anime..."
				required
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				showInput={display}
			/>

			<Icon onClick={showInput} />
		</SearchBox>
	);
};

const SearchBox = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30vw;
	padding: 0px 15px;
	margin: 20px 0px;

	@media (max-width: 768px) {
		width: 90vw;
		padding: 0px 8px;
	}
`;

const SearchInput = styled.input`
	appearance: none;
	background: none;
	outline: none;
	border: none;
	font-size: 20px;
	margin-left: auto;

	opacity: ${(props) => (props.showInput ? 1 : 0)};
	transform: ${(props) => (props.showInput ? "translateY(0)" : "translateY(-100%)")};

	display: block;
	width: 80%;
	padding: 14px;
	border-radius: 999px;
	background-color: #ccc;

	transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

	::placeholder {
		color: inherit;
	}

	&:focus,
	&:valid {
		background-color: #313131;
		color: #fff;
	}

	@media (max-width: 768px) {
		font-size: 13px;
		width: 90%;
		padding: 8px;
		height: 30px;
	}
`;

const Icon = styled(BsSearch)`
	cursor: pointer;
	margin-left: auto;
	margin-right: 20px;
	font-size: 30px;

	@media (max-width: 768px) {
		font-size: 20px;
		margin-right: 0px;
	}
`;

export default Search;
