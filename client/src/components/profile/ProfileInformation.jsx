import ProfileInfoData from "./information/ProfileInfoData";
import ProfilePicture from "./information/ProfilePicture";
import React from "react";
import styled from "styled-components";

/**
 * first section of the users profile containing user information and profile picture
 * @param {} param0
 * @returns
 */
const ProfileInformation = ({ user }) => {
	return (
		<Wrapper>
			<Title>My Information </Title>

			<Info>
				<ProfileInfoData user={user} />
				{/* Profile Picture component with save button */}
				<ProfilePicture user={user} />
			</Info>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
`;

const Title = styled.h1`
	font-size: 40px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 20px;
`;

export default ProfileInformation;
