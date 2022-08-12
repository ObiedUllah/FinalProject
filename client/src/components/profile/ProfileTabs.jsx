import React, { useState } from "react";

import ProfileCompleted from "./lists/ProfileCompleted";
import ProfileFavorites from "./lists/ProfileFavorites";
import ProfilePlan from "./lists/ProfilePlan";
import styled from "styled-components";

const ProfileTabs = ({ user, setUser }) => {
	const [selectedTab, setSelectedTab] = useState(() => 0);

	const handleTabClick = async (event, index) => {
		event.preventDefault();
		//refresh list
		const response = await fetch(`/api/user/${user.email}`);
		const result = await response.json();
		setUser(result.data);

		//change tab
		setSelectedTab(index);
	};

	return (
		<Wrapper>
			<ButtonWrapper>
				<Button onClick={(e) => handleTabClick(e, 0)} isSelected={selectedTab === 0}>
					Completed
				</Button>
				<Button onClick={(e) => handleTabClick(e, 1)} isSelected={selectedTab === 1}>
					Plan To Watch
				</Button>
				<Button onClick={(e) => handleTabClick(e, 2)} isSelected={selectedTab === 2}>
					Favorites
				</Button>
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
	background-color: #999;
	height: 40px;
	border-top: none;
	border-left: none;
	border-right: none;
	border-bottom: ${(props) => (props.isSelected ? "5px solid purple" : "none")};
	font-weight: ${(props) => (props.isSelected ? "bold" : "")};
`;

export default ProfileTabs;
