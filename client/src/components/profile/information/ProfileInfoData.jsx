import React from "react";
import styled from "styled-components";

const ProfileInfoData = ({ user }) => {
	//avg of completed anime
	const average =
		user.list.filter((item) => item.status === "completed").reduce((total, next) => parseInt(total) + parseInt(next.rating), 0) /
		user.list.filter((item) => item.status === "completed").length;

	return (
		<Data>
			<Container>
				<Label>Email: </Label>
				<UserData> {user.email}</UserData>
			</Container>
			<Container>{user.email_verified ? <Label>Email Verified ✅</Label> : <Label>Please Verify your email!</Label>}</Container>
			<Stats>
				<Title>Stats: </Title>
				<Container>
					<Label>Favorited Animes: </Label>
					<UserData> {user.favorites.length}</UserData>
				</Container>
				<Container>
					<Label>Completed Anime: </Label>
					<UserData> {user.list.filter((item) => item.status === "completed").length}</UserData>
				</Container>
				<Container>
					<Label>Average Rating: </Label>
					<UserData>{isNaN(average) ? 0 : average.toFixed(2)}</UserData>
				</Container>
				<Container>
					<Label>Plan To Watch: </Label>
					<UserData> {user.list.filter((item) => item.status === "plan").length}</UserData>
				</Container>
			</Stats>
		</Data>
	);
};

const Data = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 30px;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0px;
	font-size: 18px;
`;

const Label = styled.h2``;

const UserData = styled.p`
	margin-left: 10px;
`;

const Stats = styled.div`
	margin-top: 25px;
	border: 5px solid #666;
	padding: 20px;
	h1 {
		font-size: larger;
		text-decoration: underline;
	}
`;
const Title = styled.h1`
	font-size: 40px;
`;

export default ProfileInfoData;
