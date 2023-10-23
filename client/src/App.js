import { Route, Routes } from "react-router-dom";

import AnimeDetails from "pages/AnimeDetails";
import CircularProg from "utils/porgress/CircularProg";
import Footer from "components/footer/Footer";
import Genres from "pages/Genres";
import GlobalStyles from "styles/GlobalStyles";
import Home from "pages/Home";
import LeftSideBar from "components/leftAside/LeftSideBar";
import MovingText from "components/home/MovingText";
import NavBar from "components/nav/NavBar";
import Profile from "pages/Profile";
import Promos from "pages/Promos";
import ProtectedRoute from "authentication/protected-route";
import RightSideBar from "components/rightAside/RightSideBar";
import Search from "components/nav/Search";
import SearchedAnimeList from "pages/SearchedAnimeList";
import SongLibrary from "pages/SongLibrary";
import { isMobile } from "utils/porgress/mobile";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			<GlobalStyles />
			<Nav>
				<NavBar />
				<MovingText />
				{isMobile && <Search />}
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
					<Route exact path="/songLibrary" element={<ProtectedRoute component={SongLibrary} />} />
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
	@media (max-width: 1200px) {
		display: flex;
		flex-direction: column;
	}
`;

const Nav = styled.header`
	flex: 0 0 100%;
	height: 15vh;

	@media (max-width: 1200px) {
		order: 1;
	}
`;

const LeftAside = styled.aside`
	flex: 0 0 15%;
	min-height: 70vh;
	min-width: 12vw;

	@media (max-width: 1200px) {
		display: none;
	}
`;

const Main = styled.article`
	flex: 0 0 70%;
	min-height: 70vh;
	padding-bottom: 6vh;
	min-width: 60vw;
	@media (max-width: 1200px) {
		min-width: 85vw;
		max-width: 85vw;
		padding: 0px 5vw;
		order: 3;
	}
	@media (max-width: 1768px) {
		min-width: 95vw;
		max-width: 95vw;
		padding: 0px 2vw;
		order: 3;
	}
`;

const RightAside = styled.aside`
	flex: 0 0 15%;
	min-height: 70vh;
	min-width: 12vw;
	@media (max-width: 1200px) {
		order: 2;
		min-height: 0px;
		width: 100%;
	}
`;

const FooterDiv = styled.footer`
	flex: 0 0 100%;
	min-height: 15vh;

	@media (max-width: 1200px) {
		order: 4;
		width: 100%;
	}
`;

export default App;
