/* eslint-disable react-hooks/exhaustive-deps */

import { TbArrowsShuffle, TbPlayerPause, TbPlayerPlay, TbPlayerSkipBack, TbPlayerSkipForward, TbRepeat } from "react-icons/tb";

import IconButtons from "./IconButtons";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

/**
 * Contains everything related to
 * playing/pausing/skipping/shuffling/repeating/changing audio time
 * Also shows user time remaining to a song
 * @param {*} param0
 * @returns
 */
const SongActions = ({ songList }) => {
	const { currentSong, audioPlayer, actions } = useContext(SongListContext);
	const { play, pause, playBefore, playNext, shuffle, repeat } = actions;

	const [playerState, setPlayerState] = useState({
		currentTime: 0,
		duration: 0,
		progress: 0,
	});

	// refernce to the song length
	const progressBarRef = useRef(null);

	const [volume, setVolume] = useState(() => 0.5);
	const [isShuffle, setIsShuffle] = useState(() => false);
	const [isRepeat, setIsRepeat] = useState(() => false);

	//checks if there is a song selected
	const checkAvailable = !currentSong.theme;

	/**
	 * Plays the song
	 */
	const handlePlay = useCallback(
		(event) => {
			event.preventDefault();
			play().then(() => {});
		},
		[play]
	);

	/**
	 * Pauses the song
	 */
	const handlePause = useCallback(
		(event) => {
			event.preventDefault();
			pause().then(() => {});
		},
		[pause]
	);

	/**
	 * Goes to the previous song
	 */
	const handleBefore = useCallback(
		(event) => {
			event.preventDefault();
			playBefore(songList).then(() => {});
		},
		[playBefore, songList]
	);

	/**
	 * Goes to the next song
	 */
	const handleNext = useCallback(
		(event) => {
			event.preventDefault();
			playNext(songList).then(() => {});
		},
		[playNext, songList]
	);

	/**
	 * sets the state to shuffle or not shuffle
	 */
	const handleShuffle = useCallback((event) => {
		event.preventDefault();
		setIsShuffle((shuff) => !shuff);
	}, []);

	/**
	 * sets the state to repeat or not repeat
	 */
	const handleRepeat = useCallback((event) => {
		event.preventDefault();
		setIsRepeat((rep) => !rep);
	}, []);

	/**
	 * Allows user to change the current time of a song by clicking on the progress bar
	 */
	const changeAudioTime = useCallback(
		(event) => {
			//only works if a song is selected
			if (!currentSong) {
				return;
			}

			//gets the progress bar and compares the distance of the screen on the left
			//to where the click was made in the progress bar
			//then changes the audio time depending on the duration of the audio
			const progressBar = progressBarRef.current;
			const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
			const progressBarWidth = progressBar.offsetWidth;
			const newTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
			audioPlayer.currentTime = newTime;
		},
		[progressBarRef, audioPlayer]
	);

	/**
	 * Changes volume of song
	 */
	const handleVolumeChange = useCallback((event) => {
		setVolume(event.target.value);
		audioPlayer.volume = event.target.value;
	}, []);

	/**
	 * Helper function that display a song length like the following
	 * 0:00/ 0:00
	 * @param {*} seconds
	 * @returns
	 */
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		let remainingSeconds = Math.floor(seconds % 60);
		if (remainingSeconds < 10) {
			remainingSeconds = "0" + remainingSeconds;
		}
		return `${minutes}:${remainingSeconds}`;
	};

	useEffect(() => {
		//handles whenever the song ends
		const ended = async () => {
			setPlayerState({
				currentTime: 0,
				duration: 0,
				progress: 0,
			});

			//repeats the current song
			if (isRepeat) {
				return await repeat();
			}

			//shuffles to find the new random song
			if (isShuffle) {
				return await shuffle(songList);
			}

			//plays the next song
			await playNext(songList);
		};

		//Updates the song length being displayed and its progress
		const updateTime = async () => {
			setPlayerState({
				currentTime: formatTime(Math.floor(audioPlayer.currentTime)),
				duration: formatTime(Math.floor(audioPlayer.duration)),
				progress: (audioPlayer.currentTime / audioPlayer.duration) * 100,
			});
		};

		audioPlayer.addEventListener("ended", ended);
		audioPlayer.addEventListener("timeupdate", updateTime);

		return () => {
			audioPlayer.removeEventListener("ended", ended);
			audioPlayer.removeEventListener("timeupdate", updateTime);
		};
	}, [audioPlayer, currentSong, isShuffle, isRepeat]);

	return (
		<Wrapper>
			<Flexbox>
				<IconButtons Icon={TbArrowsShuffle} onClick={handleShuffle} disabled={false} color={isShuffle ? "green" : "inherit"} />
				<IconButtons Icon={TbPlayerSkipBack} onClick={handleBefore} disabled={checkAvailable} />

				{currentSong.isPlaying ? (
					<IconButtons Icon={TbPlayerPause} onClick={handlePause} disabled={checkAvailable} />
				) : (
					<IconButtons Icon={TbPlayerPlay} onClick={handlePlay} disabled={checkAvailable} />
				)}

				<IconButtons Icon={TbPlayerSkipForward} onClick={handleNext} disabled={checkAvailable} />
				<IconButtons Icon={TbRepeat} onClick={handleRepeat} color={isRepeat ? "green" : "inherit"} />
			</Flexbox>

			{audioPlayer ? (
				<>
					<Progress ref={progressBarRef} onClick={changeAudioTime}>
						<ProgressBar prog={playerState.progress}></ProgressBar>
					</Progress>
					<TimeSound>
						<p>
							{playerState.currentTime} / {playerState.duration}
						</p>
						<VolumeBar type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
					</TimeSound>
				</>
			) : (
				<>
					<Progress ref={progressBarRef} onClick={changeAudioTime}>
						<ProgressBar prog={playerState.progress}></ProgressBar>
					</Progress>

					<TimeSound>
						<p>0:00/ 0:00</p>
						<VolumeBar type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
					</TimeSound>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	@media (max-width: 768px) {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		flex-direction: column;
		margin-top: 20px;
	}
`;

const Flexbox = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Progress = styled.div`
	width: 51%;
	height: 20px;
	border-radius: 30px;
	background-color: lightgrey;
	margin-top: 10px;
	margin-bottom: 5px;
	cursor: pointer;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const ProgressBar = styled.div`
	height: 100%;
	background-color: black;
	width: ${(props) => props.prog + "%"};
	border-radius: 50px;
`;

const VolumeBar = styled.input``;

const TimeSound = styled.div`
	width: 51%;
	display: flex;
	justify-content: space-between;
	margin-top: 15px;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export default SongActions;
