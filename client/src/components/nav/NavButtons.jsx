import AuthenticationButton from "components/auth/buttons/AuthenticationButton";
import { NavLink } from "react-router-dom";
import React from "react";
import Search from "./Search";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const NavButtons = () => {
	//get user
	const { isAuthenticated, user } = useAuth0();
	const picture = user?.picture;

	return (
		<Wrapper>
			<Search />

			<AuthenticationButton />
			{isAuthenticated && (
				<NavLink to="/profile">
					<Avatar src={picture} alt="Profile" />
				</NavLink>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	margin-left: auto;
	padding-right: 50px;
	align-items: center;
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 3px solid black;
	margin-left: 10px;
`;

export default NavButtons;
