/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useLayoutEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import ProfileInformation from "components/profile/ProfileInformation";
import ProfileTabs from "components/profile/ProfileTabs";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * has user information and their lists
 * @returns
 */
const Profile = () => {
	const [dbUser, setDbUser] = useState(() => null);
	const { user } = useAuth0();

	const [showButton, setShowButton] = useState(false);

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
		};
		getUser();
	}, []);

	//check for user scroll
	useLayoutEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 400) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, []);

	/**
	 * click method for automatic scroll back to top of page
	 */
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth", // for smoothly scrolling
		});
	};

	//wait until user from db is retrived
	if (!dbUser) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			<ProfileInformation user={dbUser} />
			<ProfileTabs user={dbUser} setUser={setDbUser} />
			{showButton && <BackToTopButton onClick={scrollToTop}>&#8679;</BackToTopButton>}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const BackToTopButton = styled.button`
	position: fixed;
	bottom: 50px;
	right: 80px;
	z-index: 99;
	border: none;
	outline: none;
	background-color: red;
	color: white;
	cursor: pointer;
	padding: 18px 25px;
	border-radius: 10px;
	font-size: 30px;

	transition: 0.4s;

	&:hover {
		transform: scale(1.5);
	}
`;

export default Profile;
