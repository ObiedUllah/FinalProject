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
	// Define a smaller scroll value for mobile
	const mobileScroll = 3;

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: scroll,
		slidesToScroll: scroll,
		arrows: true,
	};

	// Adjust the settings for mobile screens
	if (window.innerWidth <= 768) {
		settings.slidesToShow = mobileScroll;
		settings.slidesToScroll = mobileScroll;
	}

	return (
		<Wrapper>
			<Title>{title}</Title>
			<StyledSlider {...settings}>
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
			</StyledSlider>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	width: 100%;
	padding: 45px 0px; /* Adjust padding for mobile */
	height: 250px;

	@media (max-width: 768px) {
		height: auto;
		padding: 20px 0px; /* Adjust padding for mobile */
	}
`;

const Title = styled.h1`
	padding-bottom: 20px;
	font-size: 21px;

	@media (max-width: 768px) {
		font-size: 15px;
	}
`;

const Image = styled.img`
	width: 6vw;
	height: 9vw;

	@media (max-width: 768px) {
		width: 60%; /* Adjust image size for mobile */
		height: auto;
	}
`;

const Text = styled.p`
	text-align: center;
	line-height: 1.2em;

	@media (max-width: 768px) {
		font-size: 10px; /* Adjust font size for mobile */
		width: 70px;
	}
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

const StyledSlider = styled(Slider)`
	.slick-slider {
		text-align: center; // Center the slider
	}

	.slick-prev,
	.slick-next {
		top: 50%; // Adjust the vertical position of the navigation buttons
		transform: translateY(-50%);
		z-index: 100;
	}

	.slick-prev {
		left: 0px; // Adjust the distance from the left edge
	}

	.slick-next {
		right: 0px; // Adjust the distance from the right edge
	}

	.slick-dots {
		bottom: 0; // Move the dots (pagination) to the bottom
	}

	.slick-dots li button:before {
		font-size: 10px; // Adjust the dots size

		@media (max-width: 768px) {
			font-size: 8px;
		}
	}

	.slick-dots {
		button:before {
			margin-top: 35px; /* Add margin to the top of the active dot */

			@media (max-width: 768px) {
				margin-top: 15px;
			}
		}
	}
`;

export default AnimeSlider;
