import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useContext } from "react";

const SongTitle = () => {
	const { currentSong } = useContext(SongListContext);

	return (
		<Wrapper>
			{currentSong.theme ? (
				<div>
					<Title>{currentSong.theme}</Title>
					<SubTitle>{currentSong.title}</SubTitle>
				</div>
			) : (
				<Title>No song selected</Title>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 70%;
	height: 90%;
`;

const Title = styled.h2`
	font-size: 30px;
	margin-bottom: 10px;
`;

const SubTitle = styled.h2`
	font-size: 20px;
	font-weight: 300;
`;

export default SongTitle;
