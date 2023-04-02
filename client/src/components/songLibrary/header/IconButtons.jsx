import styled from "styled-components";

/**
 * Icon buttons for play, pause, shuffle, repeat, before, next
 * @param {*} param0
 * @returns
 */
const IconButtons = ({ Icon, onClick, disabled = false, color = "inherit" }) => {
	return (
		<Box onClick={onClick} disabled={disabled}>
			<Icon size="30px" color={color} />
		</Box>
	);
};

const Box = styled.div`
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

	pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

export default IconButtons;
