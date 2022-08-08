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
			<Nav></Nav>
			<LeftAside></LeftAside>
			<Main>
				<Routes>
					<Route exact path="/" element={<Home />} />
				</Routes>
			</Main>
			<RightAside></RightAside>
			<Footer></Footer>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

const Nav = styled.nav``;

const LeftAside = styled.aside``;

const Main = styled.div``;

const RightAside = styled.aside``;

const Footer = styled.footer``;

export default App;
