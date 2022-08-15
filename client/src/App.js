import { Route, Routes } from "react-router-dom";

import AnimeDetails from "pages/AnimeDetails";
import Footer from "components/footer/Footer";
import Genres from "pages/Genres";
import GlobalStyles from "styles/GlobalStyles";
import Home from "pages/Home";
import LeftSideBar from "components/leftAside/LeftSideBar";
import LinearProg from "utils/porgress/LinearProg";
import NavBar from "components/nav/NavBar";
import Profile from "pages/Profile";
import Promos from "pages/Promos";
import ProtectedRoute from "authentication/protected-route";
import React from "react";
import RightSideBar from "components/rightAside/RightSideBar";
import SearchedAnimeList from "pages/SearchedAnimeList";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <LinearProg />;
	}

	return (
		<Wrapper>
			<GlobalStyles />
			<Nav>
				<NavBar />
			</Nav>
			<LeftAside>
				<LeftSideBar />
			</LeftAside>
			<Main>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/profile" element={<ProtectedRoute component={Profile} />} />
					<Route exact path="/searchList" element={<SearchedAnimeList />} />
					<Route exact path="/anime/:id" element={<AnimeDetails />} />
					<Route exact path="/genres" element={<Genres />} />
					<Route exact path="/promos" element={<Promos />} />
				</Routes>
			</Main>
			<RightAside>
				<RightSideBar />
			</RightAside>
			<FooterDiv>
				<Footer />
			</FooterDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	@media (max-width: 1300px) {
		display: flex;
		flex-direction: column;
	}
`;

const Nav = styled.header`
	flex: 0 0 100%;
	height: 15vh;

	@media (max-width: 1300px) {
		order: 1;
	}
`;

const LeftAside = styled.aside`
	flex: 0 0 15%;
	min-height: 70vh;
	min-width: 12vw;

	@media (max-width: 1300px) {
		display: none;
	}
`;

const Main = styled.article`
	flex: 0 0 70%;
	min-height: 70vh;
	padding-bottom: 6vh;
	min-width: 60vw;
	@media (max-width: 1300px) {
		width: 85vw;
		padding: 0px 5vw;
		order: 3;
	}
`;

const RightAside = styled.aside`
	flex: 0 0 15%;
	min-height: 70vh;
	min-width: 12vw;
	@media (max-width: 1300px) {
		order: 2;
		min-height: 0px;
	}
`;

const FooterDiv = styled.footer`
	flex: 0 0 100%;
	min-height: 15vh;

	@media (max-width: 1300px) {
		order: 4;
	}
`;

export default App;
