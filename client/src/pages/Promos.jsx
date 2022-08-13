/* eslint-disable react-hooks/exhaustive-deps */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useContext, useEffect } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { PromosContext } from "context/PromosContext";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import styled from "styled-components";

const Promos = () => {
	const { promos } = useContext(PromosContext);
	const { getPromos } = useContext(PromosContext).actions;

	useEffect(() => {
		if (!promos) {
			getPromos();
		}
	}, []);

	// wait until data is loaded
	if (!promos) {
		<CircularProg />;
	}

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
	};

	return (
		<Wrapper>
			<Slider {...settings}>
				{promos &&
					promos.slice(0, 5).map((slide) => {
						return (
							<div key={slide.entry.mal_id}>
								<Text>
									{slide.title}: {slide.entry.title}{" "}
								</Text>
								<ReactPlayer controls={true} width="100%" height="70vh" url={slide.trailer.embed_url} />
							</div>
						);
					})}
			</Slider>
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

export default Promos;
