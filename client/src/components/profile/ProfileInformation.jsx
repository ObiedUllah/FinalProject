import React, { useRef, useState } from "react";

import Default from "../../images/default.png";
import styled from "styled-components";

/**
 * first section of the users profile containing user information and profile picture
 * @param {} param0
 * @returns
 */
const ProfileInformation = ({ user }) => {
	//profile picture state
	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState(() => (user.image === "" ? Default : user.image));
	const [selectedFile, setSelectedFile] = useState();
	const inputFile = useRef(null);

	//avg of completed anime
	const average =
		user.list.filter((item) => item.status === "completed").reduce((total, next) => parseInt(total) + parseInt(next.rating), 0) /
		user.list.filter((item) => item.status === "completed").length;

	/**
	 * gets file from the file explorer
	 * @param {*} e
	 */
	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setSelectedFile(file);
		setFileInputState(e.target.value);
	};

	/**
	 * previews the file in the users profile picture
	 * @param {*} file
	 * @returns
	 */
	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		if (file.type.indexOf("image") === -1) {
			alert("Add a picture!");
			return;
		}
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	/**
	 * makes sure there is a file and gets file data and then uploads image
	 * @param {*} e
	 * @returns
	 */
	const handleSubmitFile = (e) => {
		e.preventDefault();
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
		reader.onerror = () => {
			alert("Something went wrong!");
		};
	};

	/**
	 * uploads image to db
	 * @param {*} base64EncodedImage
	 */
	const uploadImage = async (base64EncodedImage) => {
		try {
			await fetch("/api/upload", {
				method: "POST",
				body: JSON.stringify({ data: base64EncodedImage, email: user.email }),
				headers: { "Content-Type": "application/json" },
			});
			window.location.reload(true);
		} catch (err) {
			alert("Something went wrong!");
		}
	};

	/**
	 * ref to open file explorer by clicking on the image
	 */
	const openFileExpolerer = () => {
		inputFile.current.click();
	};

	return (
		<Wrapper>
			<Title>My Information </Title>

			<Info>
				<Data>
					<Container>
						<Label>Email: </Label>
						<UserData> {user.email}</UserData>
					</Container>
					<Container>{user.email_verified ? <Label>Email Verified ✅</Label> : <Label>Please Verify your email!</Label>}</Container>
					<Stats>
						<Title>Stats: </Title>
						<Container>
							<Label>Favorited Animes: </Label>
							<UserData> {user.favorites.length}</UserData>
						</Container>
						<Container>
							<Label>Completed Anime: </Label>
							<UserData> {user.list.filter((item) => item.status === "completed").length}</UserData>
						</Container>
						<Container>
							<Label>Average Rating: </Label>
							<UserData>{isNaN(average) ? 0 : average.toFixed(2)}</UserData>
						</Container>
						<Container>
							<Label>Plan To Watch: </Label>
							<UserData> {user.list.filter((item) => item.status === "plan").length}</UserData>
						</Container>
					</Stats>
				</Data>

				<Form onSubmit={handleSubmitFile} className="form">
					<input
						id="fileInput"
						type="file"
						name="image"
						ref={inputFile}
						onChange={handleFileInputChange}
						value={fileInputState}
						style={{ display: "none" }}
					/>

					<ImageContainer onClick={openFileExpolerer}>
						<Avatar src={previewSource} alt="Profile" />
						<Centered>Upload Image</Centered>
					</ImageContainer>
					<UploadButton type="submit" hasFile={selectedFile !== undefined} disabled={selectedFile === undefined}>
						Save
					</UploadButton>
				</Form>
			</Info>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
`;

const Title = styled.h1`
	font-size: 40px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 20px;
`;

const Data = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 30px;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0px;
	font-size: 18px;
`;

const Label = styled.h2``;

const UserData = styled.p`
	margin-left: 10px;
`;

const Stats = styled.div`
	margin-top: 25px;
	border: 5px solid #666;
	padding: 20px;
	h1 {
		font-size: larger;
		text-decoration: underline;
	}
`;

const Form = styled.form`
	margin-left: auto;
	margin-right: 3vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
`;

const ImageContainer = styled.div`
	position: relative;
	color: white;
	cursor: pointer;

	&:hover {
		div {
			opacity: 0.6;
		}
	}
`;

const Centered = styled.div`
	position: absolute;
	width: 50%;
	text-align: center;
	background-color: black;
	color: white;
	opacity: 0.2;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Avatar = styled.img`
	width: 450px;
	height: 450px;
	border-radius: 50%;
	margin-left: 10px;
	margin-left: auto;
`;

const UploadButton = styled.button`
	margin-left: auto;
	padding: 15px 25px;
	border: none;
	background-color: #405cf5;
	border-radius: 10px;
	cursor: ${(props) => (props.hasFile ? "pointer" : "disabled")};

	&:hover {
		transform: ${(props) => props.hasFile && "scale(1.15)"};
	}
`;

export default ProfileInformation;
