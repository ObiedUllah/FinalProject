import styled from "styled-components";

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
	padding: 5px;
	margin: 2px;

	div {
		margin: 3px;
		padding: 2px;
	}
`;

const Index = styled.div`
	width: 5%;
	text-align: center;
`;

const ThemeTitle = styled.div`
	width: 71%;
	text-align: left;
`;

const Title = styled.div`
	width: 20%;
	text-align: left;
`;

export default ItemHeader;
