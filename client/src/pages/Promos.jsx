/* eslint-disable react-hooks/exhaustive-deps */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useContext, useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { PromosContext } from "context/PromosContext";
import ReactPlayer from "react-player";
import styled from "styled-components";

const Promos = () => {
	const { promos } = useContext(PromosContext);
	const { getPromos } = useContext(PromosContext).actions;

	const [selectedIndex, setSelectedIndex] = useState(() => 0);

	//fetches data if none is set yet
	useEffect(() => {
		if (!promos) {
			getPromos();
		}
	}, []);

	// wait until data is loaded
	if (!promos) {
		return <CircularProg />;
	}
	return (
		<Wrapper>
			<Text>Promotional Videos</Text>
			<PromosWrapper>
				{promos.map((promo, index) => {
					return (
						<Button key={index} onClick={() => setSelectedIndex(index)}>
							{promo.title}: {promo.entry.title}
						</Button>
					);
				})}
			</PromosWrapper>
			<Text>
				{promos[selectedIndex].title}: {promos[selectedIndex].entry.title}
			</Text>
			<ReactPlayer controls={true} width="100%" height="70vh" url={promos[selectedIndex].trailer.embed_url} />
		</Wrapper>
	);
};

const Wrapper = styled.section`
	width: 100%;
	padding: 30px 3px;
`;
const Text = styled.h1`
	width: 100%;
	font-size: 30px;
	margin-bottom: 10px;
	text-align: center;
`;

const PromosWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	margin: 20px;
`;

const Button = styled.button`
	flex: 0 0 15%;
	height: 60px;
	margin: 4px;
	border: none;
	border-radius: 10px;
	background-color: #888;
	cursor: pointer;

	&:hover {
		transform: scale(1.2);
		background-color: #666;
	}
`;

export default Promos;
