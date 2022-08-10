import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 16px;
`;

export const First = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Image = styled.img`
	width: 250px;
	height: 350px;
`;

export const Background = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 16px;
	max-height: 350px;
	overflow: hidden;
`;

export const Title = styled.h1`
	width: 100%;
	border-bottom: 1px solid #999;
	padding-bottom: 7px;
`;

export const SubTitle = styled.h1`
	width: 97%;
	border-bottom: 1px solid #999;
	margin-left: 20px;
	margin-top: 16px;
`;

export const Synopsis = styled.p`
	padding: 16px 0px;
`;

export const Second = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Information = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 20px;
	flex-basis: 250px;
`;

export const Container = styled.div`
	display: flex;
	padding-top: 14px;
`;

export const InformationLabel = styled.h2``;

export const InformationData = styled.p`
	padding-left: 10px;
`;

export const EpisodeList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	border: 1px solid black;
	margin-left: 20px;
	margin-top: 16px;
	max-height: 400px;
	padding: 8px;
`;

export const Episode = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 8px;
	border: 1px solid #666;
	padding: 10px;
	width: 95%;
`;

export const EpisodeLabel = styled.p`
	flex-basis: 22%;
	text-align: center;
`;

export const RelationList = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	border: 1px solid black;
	margin-left: 20px;
	margin-top: 16px;
	max-height: 400px;
	padding: 14px;
`;

export const Relation = styled.div`
	margin-top: 10px;
`;

export const Link = styled(NavLink)`
	text-decoration: none;
	color: inherit;

	transition: 0.4s;

	&:hover {
		background-color: #444;
		color: #888;
	}
`;

export const Anchor = styled.a`
	text-decoration: none;
	color: inherit;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: blue;
	}
`;
