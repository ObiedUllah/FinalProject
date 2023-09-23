/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import AuthenticationButton from "components/auth/buttons/AuthenticationButton";
import Default from "../../images/default.png";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { getUserApi } from "endpoints/apiConfig";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Right side of the navbar
 * @returns
 */
const NavButtons = () => {
	//gets user
	const { user, isAuthenticated } = useAuth0();
	const [dbUser, setDbUser] = useState(() => null);

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`${getUserApi}/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
		};
		if (isAuthenticated) {
			getUser();
		}
	}, [user, isAuthenticated]);

	return (
		<Wrapper>
			<Search />

			<AuthenticationButton />
			{isAuthenticated && dbUser && <LibraryLink to="/songLibrary">Library</LibraryLink>}
			{isAuthenticated && dbUser && (
				<NavLink to="/profile">
					{!dbUser.image ? <Avatar src={Default} alt="Profile" /> : <Avatar src={dbUser.image} alt="Profile" />}
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
	margin: 0px 10px 0px 0px;
`;

const LibraryLink = styled(NavLink)`
	text-decoration: none;
	color: white;
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80px;
	margin: 20px;
	background: #222;
	padding: 15px;
	border-radius: 5px;
`;

export default NavButtons;
