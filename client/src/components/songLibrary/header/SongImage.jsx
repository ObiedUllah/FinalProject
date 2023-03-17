import Album from "../../../images/album.png";
import styled from "styled-components";

const SongImage = () => {
	return (
		<Wrapper>
			<Image src={Album} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 60%;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	width: 200px;
`;

export default SongImage;
