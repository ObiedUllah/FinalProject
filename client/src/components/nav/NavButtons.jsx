import React, { useEffect, useState } from "react";

import AuthenticationButton from "components/auth/buttons/AuthenticationButton";
import Default from "../../images/default.png";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const NavButtons = () => {
	//get user
	const { user } = useAuth0();
	const [dbUser, setDbUser] = useState(() => null);

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
		};
		getUser();
	}, []);

	return (
		<Wrapper>
			<Search />

			<AuthenticationButton />
			{dbUser && (
				<NavLink to="/profile">
					{dbUser.image === "" ? <Avatar src={Default} alt="Profile" /> : <Avatar src={dbUser.image} alt="Profile" />}
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
	margin-left: 10px;
`;

export default NavButtons;
