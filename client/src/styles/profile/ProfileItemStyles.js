import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #777;
`;

export const Image = styled.img`
	height: 15vh;
	margin: 1vh 0px;
`;

export const Label = styled.div`
	width: 12vw;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const Button = styled.button`
	backface-visibility: hidden;
	background-color: ${(props) => (props?.confirm ? "#405cf5" : "#ff726f")};
	border-radius: 6px;
	border-width: 0;
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	height: 35px;
	width: 120px;
	padding: 0 25px;
	text-align: center;

	&:disabled {
		cursor: default;
	}

	&:focus {
		box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
			rgba(50, 151, 211, 0.3) 0 0 0 4px;
	}

	&:hover {
		color: #333;
		transform: scale(1.1);
	}
`;

export const Select = styled.select`
	outline: none;
	border: none;
	background-color: #777;
	color: inherit;
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
`;

export const Option = styled.option`
	outline: none;
	border: none;
	cursor: pointer;
`;

export const Anchor = styled(NavLink)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: inherit;
	width: 12vw;

	&:hover {
		img {
			transform: scale(1.1);
		}

		div {
			transform: scale(1.25);
			color: #999;
		}
	}
`;
