import { useRef, useState } from "react";

import Default from "../../../images/default.png";
import styled from "styled-components";
import { uploadImage as uploadImageApi } from "endpoints/apiConfig";

const ProfilePicture = ({ user }) => {
	//profile picture state
	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState(() => (user.image === "" ? Default : user.image));
	const [selectedFile, setSelectedFile] = useState();
	const inputFile = useRef(null);

	/**
	 * gets file from the file explorer
	 * @param {*} event
	 */
	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		previewFile(file);
		setSelectedFile(file);
		setFileInputState(event.target.value);
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
	 * @param {*} event
	 * @returns
	 */
	const handleSubmitFile = (event) => {
		event.preventDefault();
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
			await fetch(uploadImageApi, {
				method: "POST",
				body: JSON.stringify({ data: base64EncodedImage, email: user.email }),
				headers: { "Content-Type": "application/json" },
			});
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

			{selectedFile !== undefined && (
				<UploadButton type="submit" hasFile={selectedFile !== undefined} disabled={selectedFile === undefined}>
					Save
				</UploadButton>
			)}
		</Form>
	);
};

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

export default ProfilePicture;
