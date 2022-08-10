import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";

const AnimeSlider = ({ list, title }) => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 6,
		arrows: true,
	};
	return (
		<Wrapper>
			<Title>{title}</Title>
			<Slider {...settings}>
				{list.map((slide) => {
					if (slide.entry) {
						return (
							<Data key={slide.entry.mal_id}>
								<Anchor to={`/anime/${slide.entry.mal_id}`}>
									<Image src={slide.entry.images.jpg.image_url} />
									<Text>{slide.entry.title.substring(0, 13)}... </Text>
								</Anchor>
							</Data>
						);
					}
					return (
						<Data key={slide.mal_id}>
							<Anchor to={`/anime/${slide.mal_id}`}>
								<Image src={slide.images.jpg.image_url} />
								<Text>{slide.title.substring(0, 13)}... </Text>
							</Anchor>
						</Data>
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
	width: 65vw;
	padding: 30px 3px;
`;

const Data = styled.div``;

const Image = styled.img`
	width: 6vw;
	height: 9vw;
`;
const Text = styled.p`
	white-space: nowrap;
	font-size: 1em;
`;

const Anchor = styled(NavLink)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: inherit;

	&:hover {
		img {
			width: 7vw;
			height: 10vw;
		}
	}
`;

export default AnimeSlider;
