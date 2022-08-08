import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const CircularProg = () => {
	return (
		<Prog>
			<CircularProgress size="40px" />
		</Prog>
	);
};

const Prog = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default CircularProg;
