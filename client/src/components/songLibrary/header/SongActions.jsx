import { TbArrowsShuffle, TbPlayerPlay, TbPlayerSkipBack, TbPlayerSkipForward, TbRepeat } from "react-icons/tb";

import styled from "styled-components";

const SongActions = () => {
	return (
		<Wrapper>
			<Flexbox>
				<Box>
					<TbArrowsShuffle size="30px" />
				</Box>
				<Box>
					<TbPlayerSkipBack size="30px" />
				</Box>
				<Box>
					<TbPlayerPlay size="30px" />
				</Box>
				<Box>
					<TbPlayerSkipForward size="30px" />
				</Box>
				<Box>
					<TbRepeat size="30px" />
				</Box>
			</Flexbox>

			{/* <TbPlayerPause size="30px" /> */}
			{/* <TbPlayerPlay size="30px" />

			<TbPlayerSkipForward size="30px" />
			<TbRepeat size="30px" /> */}
		</Wrapper>
	);
};

const Wrapper = styled.div``;

const Flexbox = styled.div`
	width: 40%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Box = styled.div``;

const Icon = styled(TbArrowsShuffle)``;

export default SongActions;
