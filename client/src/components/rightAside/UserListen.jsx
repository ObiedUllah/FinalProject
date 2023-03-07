import CircularProg from "utils/porgress/CircularProg";
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useState } from "react";

const UserListen = () => {
	const [dbUser, setDbUser] = useState(() => null);
	const { user } = useAuth0();

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
		};
		getUser();
	}, []);

	//if no user then tell user to sign in
	if (!dbUser) {
		return (
			<BoxDiv>
				<Title>User's Songs</Title>
				<p>Sign in to add songs to your list</p>
			</BoxDiv>
		);
	}

	return (
		<BoxDiv>
			<Title>User's Songs</Title>
			{!dbUser && <p>Sign in to add songs to your list</p>}
			{dbUser && <p>Songs</p>}
		</BoxDiv>
	);
};

const BoxDiv = styled.div`
	@media (max-width: 1200px) {
		display: none;
	}
`;

const Title = styled.h3`
	margin-top: 1vh;
	font-size: 24px;
	margin-bottom: 16px;
	text-align: center;
`;

export default UserListen;
