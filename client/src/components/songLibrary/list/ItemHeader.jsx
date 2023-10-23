import styled from "styled-components";

/**
 * Header for the list of songs. Similar to table header!
 * @returns
 */
const ItemHeader = () => {
	return (
		<Wrapper>
			<Index>#</Index>
			<ThemeTitle>Title</ThemeTitle>
			<Title>Anime</Title>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;

	div {
		margin: 3px;
		padding: 2px;
	}
`;

const Index = styled.div`
	width: 2%;
	text-align: center;
`;

const ThemeTitle = styled.div`
	width: 74%;
	text-align: left;
`;

const Title = styled.div`
	width: 20%;
	text-align: left;
`;

export default ItemHeader;
