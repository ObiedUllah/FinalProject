import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	border: none;
`;

export const TitleDiv = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 3px solid #777;
`;
export const Label = styled.label`
	font-size: 20px;
	margin: 1vh 0vh;
	width: 12vw;
	text-align: center;
`;

export const Button = styled.button`
	margin-bottom: 5px;
	background-color: transparent;
	color: inherit;
	border: none;
	font-size: 20px;
	margin: 1vh 0vh;
	width: 12vw;

	&:hover {
		border-bottom: 3px solid purple;
		font-weight: bold;
		cursor: pointer;
	}
`;
