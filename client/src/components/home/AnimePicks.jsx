import { useEffect, useRef, useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

/**
 * Top of the homepage that shows a few  hand picked anime
 * Has a usefeect with a settimeout that shows a different anime every 3 seconds
 * @param {*} param0
 * @returns
 */
const AnimePicks = ({ animePicks }) => {
	const [currentAnime, setCurrentAnime] = useState({ ...animePicks[0], index: 0 });
	const wrapperRef = useRef(null);

	useEffect(() => {
		const animate = () => {
			//loading state for the wrapper to disappear
			if (wrapperRef) wrapperRef.current.style.opacity = 0;
			setTimeout(() => {
				setCurrentAnime((prevAnime) => {
					const nextIndex = prevAnime.index + 1 >= animePicks.length ? 0 : prevAnime.index + 1;
					return { ...animePicks[nextIndex], index: nextIndex };
				});
				//displays the wrapper
				if (wrapperRef) wrapperRef.current.style.opacity = 1;
			}, 500);

			setTimeout(animate, 3000);
		};
		animate();

		return () => clearTimeout(animate);
	}, [animePicks]);
	return (
		<>
			<HeaderTitle>Goated Picks</HeaderTitle>
			<Wrapper ref={wrapperRef}>
				<div>
					<Img src={currentAnime.images.jpg.image_url} />
				</div>

				<Info>
					<Title>{currentAnime.title}</Title>
					<Text>{currentAnime.synopsis}</Text>
					<Anchor to={`/anime/${currentAnime.mal_id}`}>More Info</Anchor>
				</Info>
			</Wrapper>
		</>
	);
};

const HeaderTitle = styled.h1`
	@media (max-width: 1000px) {
		display: none;
	}
	text-align: left;
	font-size: 18px;
	margin-bottom: 20px;
	width: 95%;
`;

const Wrapper = styled.div`
	@media (max-width: 1000px) {
		display: none;
	}
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;

	background-image: repeating-linear-gradient(-45deg, #1b1b1b, #242323 10px, #312727 10px, #302323 20px);
	padding: 15px;
	width: 90%;
	height: 400px;
	border-radius: 20px;

	transition: opacity 0.5s ease-in-out;
`;

const Img = styled.img`
	width: 230px;
	height: 350px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	width: 70%;
`;

const Title = styled.h3`
	font-size: 24px;
	color: white;
	font-weight: bold;
`;

const Text = styled.h3`
	font-weight: 300;
	margin: 5% 0px;
	line-height: 20px;
	color: white;
`;

const Anchor = styled(NavLink)`
	text-decoration: none;
	color: black;
	padding: 5px;
	border: 1px solid black;
	width: 100px;
	background: white;
	text-align: center;

	&:hover {
		transform: scale(1.05);
		background: gray;
	}
`;

export default AnimePicks;
