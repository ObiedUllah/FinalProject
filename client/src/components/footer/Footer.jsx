import DarkMode from "components/themes/DarkMode";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Footer = () => {
	const { loginWithRedirect, logout } = useAuth0();
	return (
		<Wrapper>
			<Upperdiv>
				<div>
					<h4>Contact</h4>
					<p>
						<a href="mailto:obiedullah@outlook.com">Email</a>
					</p>
					<a href="https://www.linkedin.com/in/obied-ullah" target="_blank" rel="noreferrer">
						Linkeldn
					</a>
					<a href="https://www.instagram.com/sogekingullah" target="_blank" rel="noreferrer">
						Instagram
					</a>
				</div>
				<div>
					<h4>Information</h4>
					<Link to="/genres">Genres</Link>
					<Link to="/promos">Promos</Link>
				</div>
				<div>
					<h4>User</h4>
					<Link to="/profile">Profile</Link>
					<button
						onClick={() =>
							loginWithRedirect({
								screen_hint: "signup",
							})
						}
					>
						Sign Up
					</button>

					<button onClick={() => loginWithRedirect()}>Login</button>

					<button
						onClick={() =>
							logout({
								returnTo: window.location.origin,
							})
						}
					>
						Log Out
					</button>
				</div>
				<div>
					<h4>Apis</h4>
					<a href="https://auth0.com/docs/api" target="_blank" rel="noreferrer">
						Auth 0 API
					</a>
					<a href="https://jikan.moe/" target="_blank" rel="noreferrer">
						Jikan API
					</a>
					<a href="https://animechan.vercel.app/api/quotes" target="_blank" rel="noreferrer">
						AnimeChan API
					</a>
					<a href="https://rapidapi.com/" target="_blank" rel="noreferrer">
						Rapid API (YT download)
					</a>
					<a href="https://www.npmjs.com/package/youtube-search-without-api-key" target="_blank" rel="noreferrer">
						YT search API
					</a>
					<a href="https://cloudinary.com/documentation/image_upload_api_reference" target="_blank" rel="noreferrer">
						Cloudinary API
					</a>
					<a href="https://react-slick.neostack.com/docs/api/" target="_blank" rel="noreferrer">
						Slider API
					</a>
				</div>
			</Upperdiv>
			<LowerDiv>
				<DarkMode />
			</LowerDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-left: 2vw;
	margin-right: 2vw;
	border-top: 2px solid black;
`;

const Upperdiv = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	align-items: flex-start;
	margin-bottom: 20px;
	margin-top: 20px;

	div a {
		color: inherit;
		text-decoration: none;
		font-size: 14px;
		padding: 6px 0px;
		&:hover {
			color: #999;
		}
	}
	div p {
		cursor: pointer;
		padding: 0;
		margin: 0;
		font-size: 14px;
		padding: 6px 0px;
		&:hover {
			color: #999;
		}
	}
	div {
		display: flex;
		flex-flow: column nowrap;
	}

	div button {
		background: none;
		border: none;
		margin: 6px 0px;
		padding: 0;
		color: inherit;
		cursor: pointer;
		text-align: left;

		&:hover {
			color: #999;
		}
	}
`;

const LowerDiv = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	padding-bottom: 1vh;
`;
export default Footer;
