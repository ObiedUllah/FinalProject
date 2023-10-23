import SongActions from "./SongActions";
import SongImage from "./SongImage";
import SongTitle from "./SongTitle";
import { isMobile } from "utils/porgress/mobile";
import styled from "styled-components";

/**
 * Top div of the songLibrary page which has the song image, title and all the song actions
 * @param {*} param0
 * @returns
 */
const SongHeader = ({ songList }) => {
	if (isMobile) {
		return (
			<Wrapper>
				<TitleActionsDiv>
					<SongImage />
					<SongTitle />
				</TitleActionsDiv>

				<SongActions songList={songList} />
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<SongImage />
			<TitleActionsDiv>
				<SongTitle />
				<SongActions songList={songList} />
			</TitleActionsDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	margin: 80px 0px;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const TitleActionsDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	@media (max-width: 768px) {
		flex-direction: row;
	}
`;

export default SongHeader;
