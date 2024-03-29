/* eslint-disable react-hooks/exhaustive-deps */

import { NavLink, useNavigate } from "react-router-dom";

import QuotesListenTabs from "./QuotesListenTabs";
import styled from "styled-components";

/**
 * displays random quotes
 */
const RightSideBar = () => {
	// const { quotes } = useContext(RandomQuoteContext);
	// const { getQuotes } = useContext(RandomQuoteContext).actions;
	// console.log(quotes);

	//gets the anime information on the right side bar on the top
	// useEffect(() => {
	// 	if (!quotes) {
	// 		getQuotes();
	// 	}
	// }, []);

	const navigate = useNavigate();

	const handleClickSeasonal = async (event) => {
		event.preventDefault();
		navigate("searchList", { state: { url: "https://api.jikan.moe/v4/seasons/now?" } });
	};

	const handleClickUpcoming = async (event) => {
		event.preventDefault();
		navigate("searchList", { state: { url: "https://api.jikan.moe/v4/seasons/upcoming?" } });
	};

	//wait until the quotes are loaded
	// if (!quotes) {
	// 	return <CircularProg />;
	// }

	return (
		<Nav>
			<Anchor to={`/`}>Home</Anchor>
			<Anchor to={`/genres`}>Genres</Anchor>
			<Anchor to={`/promos`}>Recent Promos</Anchor>
			<Button onClick={handleClickSeasonal}>Seasonal Anime</Button>
			<Button onClick={handleClickUpcoming}>Upcoming Anime</Button>

			<QuotesListenTabs />
		</Nav>
	);
};

const Nav = styled.nav`
	padding: 10%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media (max-width: 1200px) {
		order: 4;
		padding: 1vh 1vw;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	@media (max-width: 768px) {
		padding: 0;
		margin: 0px 3px;
	}
`;

const Anchor = styled(NavLink)`
	all: initial;
	padding: 10px;
	width: 200px;

	color: #313131;
	font-size: 16px;
	margin-bottom: 16px;

	background-color: #fff;
	text-decoration: none;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #888;
		transform: scale(1.1);
	}
	@media (max-width: 1200px) {
		padding: 9px 0px;
		width: 19%;
	}

	@media (max-width: 768px) {
		height: 35px;
		padding: 5px;
		margin: 1px;
	}
`;

const Button = styled.button`
	all: initial;
	padding: 10px;
	width: 200px;

	color: #313131;
	font-size: 16px;
	margin-bottom: 16px;

	background-color: #fff;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	border: none;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #888;
		transform: scale(1.1);
	}

	@media (max-width: 1200px) {
		width: 19%;
	}

	@media (max-width: 768px) {
		height: 35px;
		padding: 5px;
		margin: 1px;
	}
`;

export default RightSideBar;
