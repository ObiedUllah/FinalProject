import { LinearProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const LinearProg = () => {
	return (
		<Prog>
			<LinearProgress />
		</Prog>
	);
};

const Prog = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30vh;
`;

export default LinearProg;
