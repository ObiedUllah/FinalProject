import Album from "../../../images/album.png";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useContext } from "react";

const SongImage = () => {
	const { currentSong } = useContext(SongListContext);

	return <Wrapper>{currentSong.image ? <Image src={currentSong.image} /> : <Image src={Album} />}</Wrapper>;
};

const Wrapper = styled.div`
	width: 60%;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	width: 200px;
	height: 280px;
`;

export default SongImage;
