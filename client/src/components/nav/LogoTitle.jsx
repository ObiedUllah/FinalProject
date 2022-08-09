import Logo from "../../images/chibi.png";
import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const LogoTitle = () => {
	return (
		<Wrapper to="/">
			<Image src={Logo} />
			<Title>AnimeEnma</Title>
		</Wrapper>
	);
};

const Wrapper = styled(NavLink)`
	display: flex;
	align-items: center;
	padding-left: 50px;
	text-decoration: none;
	color: inherit;
`;

const Image = styled.img`
	height: 125px;
`;

const Title = styled.div`
	font-size: 3.5em;
	margin-left: 30px;
`;

export default LogoTitle;
