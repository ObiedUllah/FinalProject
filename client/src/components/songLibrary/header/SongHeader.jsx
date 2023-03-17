import SongActions from "./SongActions";
import SongImage from "./SongImage";
import SongTitle from "./SongTitle";
import styled from "styled-components";

const SongHeader = ({ songList }) => {
	return (
		<Wrapper>
			<SongImage />
			<TitleActionsDiv>
				<SongTitle />
				<SongActions />
			</TitleActionsDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	margin: 80px 0px;
`;

const TitleActionsDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export default SongHeader;
