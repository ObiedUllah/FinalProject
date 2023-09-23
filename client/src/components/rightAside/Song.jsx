import { Link } from "react-router-dom";
import { removeSongFromList } from "endpoints/apiConfig";
import styled from "styled-components";

/**
 * Single song div in the users songs list in the right sidebar
 * allows user to click on song and go to anime details
 * @param {*} param0
 * @returns
 */
const Song = ({ song, index, setWidgets, dbUser, setStatus }) => {
	//format the title text
	const formatText = (str) => {
		return str.replace(/ *\([^)]*\) */g, " ");
	};

	/**
	 * removes a song from the list and updates the frontend so that its added to the widgets
	 * @param {*} event
	 */
	const handleRemove = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		//loading state in UserListen
		setStatus(true);

		try {
			//updates the songs list in the database
			await fetch(`${removeSongFromList}/${song.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: dbUser.email }),
			})
				.then((res) => res.json())
				.then((data) => {
					//updates in the frontend
					if (data.status === 200) {
						setWidgets(data.data.songList);
					}
					//ends loading state
					setStatus(false);
				});
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	return (
		<Wrapper>
			<FlexBox to={`/anime/${song.mal_id}`} state={{ index: song.index, type: song.type }} index={index}>
				<Span>{index} </Span>
				<Title>{formatText(song.theme)}</Title>
				<Button onClick={(event) => handleRemove(event)}>x</Button>
			</FlexBox>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: none;
	background-color: #191414;
	padding: 8px 8px 0px 8px;
`;

const FlexBox = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	padding: 10px;
	text-decoration: none;
	color: white;

	&:hover {
		background-color: #474545;
	}
	cursor: pointer;
`;

const Title = styled.h4`
	align-self: left;
	width: 90%;
`;
const Span = styled.span`
	margin-right: 10px;
`;

const Button = styled.button`
	cursor: pointer;
	background-color: inherit;
	border: none;
	margin-left: 1px;
	color: white;

	&:hover {
		color: black;
		background-color: white;
		border: 1px solid white;
		border-radius: 5px;
	}
`;
export default Song;
