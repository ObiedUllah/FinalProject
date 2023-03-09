import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const CircularProg = ({ height = 30 }) => {
	return (
		<Prog height={height}>
			<CircularProgress size="40px" />
		</Prog>
	);
};

const Prog = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: ${(props) => props.height + "vh"};
`;

export default CircularProg;
