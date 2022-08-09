import { Route, Routes } from "react-router-dom";

import Footer from "components/footer/Footer";
import GlobalStyles from "styles/GlobalStyles";
import Home from "pages/Home";
import LeftSideBar from "components/leftAside/LeftSideBar";
import LinearProg from "utils/porgress/LinearProg";
import NavBar from "components/nav/NavBar";
import Profile from "pages/Profile";
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
`;

const Nav = styled.header`
	flex: 0 0 100%;
	height: 15vh;
`;

const LeftAside = styled.aside`
	flex: 0 0 15%;
	min-height: 70vh;
`;

const Main = styled.article`
	flex: 0 0 70%;
	min-height: 70vh;
`;

const RightAside = styled.aside`
	flex: 0 0 15%;
	min-height: 70vh;
`;

const FooterDiv = styled.footer`
	flex: 0 0 100%;
`;

export default App;
