import LogoTitle from "./LogoTitle";
import NavButtons from "./NavButtons";
import React from "react";
import styled from "styled-components";

const NavBar = () => {
	return (
		<Nav>
			<LogoTitle />
			<NavButtons />
		</Nav>
	);
};

const Nav = styled.nav`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	border-bottom: 1px solid black;
`;

export default NavBar;
