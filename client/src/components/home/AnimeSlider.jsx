import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";

/**
 * Carousel for Anime List using Slider from "react-slick";
 * sets default amt of animes per slide to 8 but can be changed
 * ex: only 2 recommended anime then only have 2 anime per slide and only one slide
 * @param {*} param0
 * @returns
 */
const AnimeSlider = ({ list, title, scroll = 8 }) => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: scroll,
		slidesToScroll: scroll,
		arrows: true,
	};
	return (
		<Wrapper>
			<Title>{title}</Title>
			<Slider {...settings}>
				{list.map((slide) => {
					if (slide.entry) {
						return (
							<div key={slide.entry.mal_id}>
								<Anchor to={`/anime/${slide.entry.mal_id}`}>
									<Image src={slide.entry.images.jpg.image_url} />
									<Text>{slide.entry.title} </Text>
								</Anchor>
							</div>
						);
					}
					return (
						<div key={slide.mal_id}>
							<Anchor to={`/anime/${slide.mal_id}`}>
								<Image src={slide.images.jpg.image_url} />
								<Text>{slide.title} </Text>
							</Anchor>
						</div>
					);
				})}
			</Slider>
		</Wrapper>
	);
};

const Title = styled.h1`
	padding-bottom: 20px;
`;

const Wrapper = styled.section`
	width: 100%;
	padding: 30px 3px;
	height: 250px;
`;

const Image = styled.img`
	width: 6vw;
	height: 9vw;
`;
const Text = styled.p`
	text-align: center;
	line-height: 1.2em;
`;

const Anchor = styled(NavLink)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: inherit;

	&:hover {
		img {
			transform: scale(1.05);
		}
	}
`;

export default AnimeSlider;
