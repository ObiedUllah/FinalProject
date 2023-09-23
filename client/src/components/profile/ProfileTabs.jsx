import ProfileCompleted from "./lists/sections/ProfileCompleted";
import ProfileFavorites from "./lists/sections/ProfileFavorites";
import ProfilePlan from "./lists/sections/ProfilePlan";
import { getUser } from "endpoints/apiConfig";
import styled from "styled-components";
import { useState } from "react";

/**
 * 3 tabs (completed, plan to watch, favorite)
 * allows t switch between them
 * @param {*} param0
 * @returns
 */
const ProfileTabs = ({ user, setUser }) => {
	const [selectedTab, setSelectedTab] = useState(() => 0);

	const handleTabClick = async (event, index) => {
		event.preventDefault();
		//refresh list
		const response = await fetch(`${getUser}/${user.email}`);
		const result = await response.json();
		setUser(result.data);

		//change tab
		setSelectedTab(index);
	};

	return (
		<Wrapper>
			<ButtonWrapper>
				<Button onClick={(event) => handleTabClick(event, 0)} isSelected={selectedTab === 0}>
					Completed
				</Button>
				<Button onClick={(event) => handleTabClick(event, 1)} isSelected={selectedTab === 1}>
					Plan To Watch
				</Button>
				<Button onClick={(event) => handleTabClick(event, 2)} isSelected={selectedTab === 2}>
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
