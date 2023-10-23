import ProfileInfoData from "./information/ProfileInfoData";
import ProfilePicture from "./information/ProfilePicture";
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

	@media (max-width: 768px) {
		font-size: 26px;
		text-align: center;
	}
`;

const Info = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 20px;

	@media (max-width: 768px) {
		flex-direction: column-reverse;
	}
`;

export default ProfileInformation;
