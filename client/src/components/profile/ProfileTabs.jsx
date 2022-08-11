import React, { useState } from "react";

import ProfileCompleted from "./lists/ProfileCompleted";
import ProfileFavorites from "./lists/ProfileFavorites";
import ProfilePlan from "./lists/ProfilePlan";
import styled from "styled-components";

const ProfileTabs = ({ user }) => {
	const [selectedTab, setSelectedTab] = useState(() => 0);

	return (
		<Wrapper>
			<ButtonWrapper>
				<Button onClick={() => setSelectedTab(0)}>Completed</Button>
				<Button onClick={() => setSelectedTab(1)}>Plan To Watch</Button>
				<Button onClick={() => setSelectedTab(2)}>Favorites</Button>
			</ButtonWrapper>

			{selectedTab === 0 && <ProfileCompleted user={user} />}
			{selectedTab === 1 && <ProfilePlan user={user} />}
			{selectedTab === 2 && <ProfileFavorites user={user} />}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

const ButtonWrapper = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const Button = styled.button`
	flex: 1 1 33%;
	cursor: pointer;
	background-color: #d0d0d0;
	border: 1px solid gray;
	height: 30px;
	border: none;
	margin: 0 3px;
	border-radius: 2px;
`;

export default ProfileTabs;
