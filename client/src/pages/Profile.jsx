/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import ProfileInformation from "components/profile/ProfileInformation";
import ProfileTabs from "components/profile/ProfileTabs";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
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

	//wait until user from db is retrived
	if (!dbUser) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			<ProfileInformation user={dbUser} />
			<ProfileTabs user={dbUser} setUser={setDbUser} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default Profile;
