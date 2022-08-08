import { Route, Routes } from "react-router-dom";

import GlobalStyles from "styles/GlobalStyles";
import Home from "pages/Home";
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	return (
		<Wrapper>
			<GlobalStyles />
			<Nav>NAV</Nav>
			<LeftAside>LEFT</LeftAside>
			<Main>
				<Routes>
					<Route exact path="/" element={<Home />} />
				</Routes>
			</Main>
			<RightAside>RIGHT</RightAside>
			<Footer>FOOTER</Footer>
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

const Footer = styled.footer`
	flex: 0 0 100%;
`;

export default App;
