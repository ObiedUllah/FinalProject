/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import LoginButton from "components/auth/buttons/LoginButton";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const AddToListSection = ({ anime }) => {
	const { user, isAuthenticated } = useAuth0();
	const [isFavorite, setIsFavorite] = useState(() => false);
	const [rating, setRating] = useState(() => "");
	const [status, setStatus] = useState(() => "plan");
	const [inList, setInList] = useState(() => false);

	const [isUpdated, setIsUpdated] = useState(() => false);

	const [dbUser, setDbUser] = useState(null);

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);

			//set user favorites to be check or not checked
			result.data.favorites ? setIsFavorite(result.data.favorites.filter((e) => e.mal_id === anime.mal_id).length > 0) : setIsFavorite(false);

			//set user plan/completed and rating
			if (result.data.list) {
				//if anime not in list then set to default
				if (!result.data.list.filter((e) => e.mal_id === anime.mal_id).length > 0) {
					setInList(false);
					setRating("");
					setStatus("plan");
				}
				//if anime in list
				else {
					setInList(true);
					let animeFromList = result.data.list.find((e) => e.mal_id === anime.mal_id);
					//if anime is plan to watch set to default
					if (animeFromList.status === "plan") {
						setRating("");
						setStatus("plan");
					}
					//if anime is completed
					else {
						setRating(animeFromList.rating);
						setStatus(animeFromList.status);
					}
				}
			}
			//if no data in list then set to default
			else {
				setInList(false);
				setRating("");
				setStatus("plan");
			}
		};
		getUser();
	}, [anime]);

	/**
	 * sets status of anime
	 * @param {*} event
	 */
	const handleStatusChange = (event) => {
		console.log("✅" + event.target.value);
		if (event.target.value === "plan") {
			setRating("");
		}
		setStatus(event.target.value);
	};

	/**
	 * sets rating for select
	 * @param {*} event
	 */
	const handleRatingChange = (event) => {
		setRating(event.target.value);
	};

	/**
	 * sets the checkbox to selected or not depending on if user adds or removes from favorites
	 * @param {*} event
	 */
	const handleFavoriteChange = async (event) => {
		event.preventDefault();
		//data to send to db
		const body = {
			email: dbUser.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				image: anime.images.jpg.image_url,
				score: anime.score,
			},
		};

		try {
			//update the favorites in the database
			const response = await fetch("/api/user/favorite", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const result = await response.json();

			//change checkbox
			if (result.status === 200) {
				setIsFavorite((current) => !current);
			}
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	/**
	 * adds an anime to the users completed/ plan to watch list
	 * @param {*} event
	 * @returns
	 */
	const handleAddToList = async (event) => {
		event.preventDefault();

		//make sure the user selected a rating
		if (status === "completed" && isNaN(parseInt(rating))) {
			alert("Select a Rating, you may change it later");
			return;
		}

		//data to send to db
		let body = {
			email: dbUser.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				image: anime.images.jpg.image_url,
				score: anime.score,
				status: status,
				rating: rating,
			},
		};

		try {
			//update the favorites in the database
			const response = await fetch("/api/user/status", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const result = await response.json();

			//change status
			if (result.status === 200) {
				setInList(true);
				setRating(rating);
				setStatus(status);
				setIsUpdated(true);
			}
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	/**
	 * removes an anime from the users plan towatch/completed list
	 * @param {*} event
	 */
	const handleRemoveFromList = async (event) => {
		event.preventDefault();
		//data to send to db
		const body = {
			email: dbUser.email,
			data: { mal_id: anime.mal_id },
		};

		try {
			//update the favorites in the database
			const response = await fetch("/api/user/status", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const result = await response.json();

			//change status and
			if (result.status === 200) {
				setInList(false);
				setRating("");
				setStatus("plan");
				setIsUpdated(false);
			}
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	return (
		<>
			{isAuthenticated ? (
				<Wrapper>
					<Select id="status" onChange={handleStatusChange} value={status}>
						<Option value="plan">Plan to Watch</Option>
						<Option value="completed">Completed</Option>
					</Select>

					<Select id="rating" disabled={status !== "completed"} onChange={handleRatingChange} value={rating}>
						<Option disabled value={""}>
							Rating
						</Option>
						{[...Array(11).keys()]
							.map((i) => i)
							.map((index) => {
								return (
									<Option key={index} value={index}>
										{index}
									</Option>
								);
							})}
					</Select>

					{inList ? (
						<div>
							<Button confirm={true} onClick={handleAddToList}>
								Update List
							</Button>
							<Button confirm={false} onClick={handleRemoveFromList}>
								Remove
							</Button>
							{isUpdated && <SuccessMessage>Updated!</SuccessMessage>}
						</div>
					) : (
						<div>
							<Button confirm={true} onClick={handleAddToList}>
								Add to List
							</Button>
						</div>
					)}
					<div>
						<label htmlFor="favorite">Favorite</label>
						<Checkbox
							type="checkbox"
							value={isFavorite}
							checked={isFavorite}
							onChange={handleFavoriteChange}
							id="favorite"
							name="favorite"
						/>
					</div>
				</Wrapper>
			) : (
				<Wrapper>
					<LoginDiv>
						<LoginMessage>Login to add to your list: </LoginMessage>
						<LoginButton />
					</LoginDiv>
				</Wrapper>
			)}
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border: 2px solid #aaa;
	border-radius: 2px;
	padding: 22px;
	margin: 16px;
`;

const Button = styled.button`
	backface-visibility: hidden;
	background-color: ${(props) => (props.confirm ? "#405cf5" : "#ff726f")};
	border-radius: 6px;
	border-width: 0;
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	height: 35px;
	width: 120px;
	padding: 0 25px;
	text-align: center;

	&:disabled {
		cursor: default;
	}

	&:focus {
		box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
			rgba(50, 151, 211, 0.3) 0 0 0 4px;
	}

	&:hover {
		color: #333;
	}
`;

const Select = styled.select`
	outline: none;
	border: none;
	background-color: #777;
	color: inherit;
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
`;

const Option = styled.option`
	outline: none;
	border: none;
	padding: 8px;
	cursor: pointer;
`;

const LoginMessage = styled.h3`
	font-size: 20px;
	margin-right: 10px;
`;

const LoginDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Checkbox = styled.input`
	cursor: pointer;
`;

const SuccessMessage = styled.div`
	text-align: center;
	color: lightskyblue;
	margin-top: 3px;
`;

export default AddToListSection;
