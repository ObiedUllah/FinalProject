import Album from "../../../images/album.png";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useContext } from "react";

/**
 * Image of the current song being played
 * @returns
 */
const SongImage = () => {
	const { currentSong } = useContext(SongListContext);

	return <Wrapper>{currentSong.image ? <Image src={currentSong.image} /> : <Image src={Album} />}</Wrapper>;
};

const Wrapper = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 768px) {
		width: 30%;
		justify-content: center;
	}
`;

const Image = styled.img`
	width: 200px;
	height: 280px;
	border: 2px solid black;

	@media (max-width: 768px) {
		width: 90px;
		height: 130px;
	}
`;

export default SongImage;
