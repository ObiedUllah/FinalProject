import LogoTitle from "./LogoTitle";
import NavButtons from "./NavButtons";
import styled from "styled-components";

/**
 * Navbar containing a left and right side
 * @returns
 */
const NavBar = () => {
	return (
		<Nav>
			<LogoTitle />
			<NavButtons />
		</Nav>
	);
};

const Nav = styled.nav`
	height: 90%;
	width: 100%;
	display: flex;
	align-items: center;
	border-bottom: 1px solid black;
`;

export default NavBar;
