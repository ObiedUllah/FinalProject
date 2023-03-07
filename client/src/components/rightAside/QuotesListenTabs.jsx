import Quotes from "./Quotes";
import React from "react";
import UserListen from "./UserListen";
import styled from "styled-components";
import { useState } from "react";

const QuotesListenTabs = () => {
	const [selectedTab, setSelectedTab] = useState(() => 0);

	const handleTabClick = async (event, index) => {
		event.preventDefault();
		//change tab
		setSelectedTab(index);
	};

	return (
		<>
			<Wrapper>
				<Button onClick={(event) => handleTabClick(event, 0)} isSelected={selectedTab === 0}>
					Your Songs
				</Button>
				<Button onClick={(event) => handleTabClick(event, 1)} isSelected={selectedTab === 1}>
					Random Quotes
				</Button>
			</Wrapper>

			{selectedTab === 0 && <UserListen />}
			{selectedTab === 1 && <Quotes />}
		</>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
`;

const Button = styled.button`
	width: 100%;
	cursor: pointer;
	background-color: ${(props) => (props.isSelected ? "gray" : "none")};
	border-top: 1px solid black;
	border-left: 1px solid black;
	border-right: 1px solid black;
	border-bottom: ${(props) => (props.isSelected ? "5px solid purple" : "none")};
	font-weight: ${(props) => (props.isSelected ? "bold" : "")};
`;

export default QuotesListenTabs;
