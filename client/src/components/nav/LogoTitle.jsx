import Logo from "../../images/chibi.png";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/**
 * Left Side of the navbar containing the logo and the title
 * @returns
 */
const LogoTitle = () => {
	return (
		<Wrapper to="/">
			<Container>
				<Image src={Logo} alt="Logo" />
			</Container>
			<Title>AnimeEnma</Title>
		</Wrapper>
	);
};

const Wrapper = styled(NavLink)`
	display: flex;
	align-items: center;
	padding-left: 50px;
	text-decoration: none;
	color: inherit;
`;

const Container = styled.div`
	position: relative;
	width: 125px;
	height: 125px;
`;

const Image = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	animation: rotate 4s linear infinite;

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const Title = styled.div`
	font-size: 2.5em;
	margin-left: 30px;
`;

export default LogoTitle;
