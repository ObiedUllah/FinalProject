import { TbArrowsShuffle, TbPlayerPause, TbPlayerPlay, TbPlayerSkipBack, TbPlayerSkipForward, TbRepeat } from "react-icons/tb";

import IconButtons from "./IconButtons";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const SongActions = ({ songList }) => {
	const { currentSong, audioPlayer, actions } = useContext(SongListContext);
	const { play, pause, playBefore, playNext, shuffle, repeat } = actions;

	const [playerState, setPlayerState] = useState({
		currentTime: 0,
		duration: 0,
		progress: 0,
	});

	const progressBarRef = useRef(null);
	const [volume, setVolume] = useState(() => 0.5);
	const [isShuffle, setIsShuffle] = useState(() => false);
	const [isRepeat, setIsRepeat] = useState(() => false);

	const checkAvailable = !currentSong.theme;

	const handlePlay = useCallback(
		(event) => {
			event.preventDefault();
			play().then(() => {});
		},
		[play]
	);

	const handlePause = useCallback(
		(event) => {
			event.preventDefault();
			pause().then(() => {});
		},
		[pause]
	);

	const handleBefore = useCallback(
		(event) => {
			event.preventDefault();
			playBefore(songList).then(() => {});
		},
		[playBefore, songList]
	);

	const handleNext = useCallback(
		(event) => {
			event.preventDefault();
			playNext(songList).then(() => {});
		},
		[playNext, songList]
	);

	const handleShuffle = useCallback((event) => {
		event.preventDefault();
		setIsShuffle((shuff) => !shuff);
	}, []);

	const handleRepeat = useCallback((event) => {
		event.preventDefault();
		setIsRepeat((rep) => !rep);
	}, []);

	const changeAudioTime = useCallback(
		(event) => {
			if (!currentSong) {
				return;
			}

			const progressBar = progressBarRef.current;
			const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
			const progressBarWidth = progressBar.offsetWidth;
			const newTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
			audioPlayer.currentTime = newTime;
		},
		[progressBarRef, audioPlayer]
	);

	const handleVolumeChange = useCallback((event) => {
		setVolume(event.target.value);
		audioPlayer.volume = event.target.value;
	}, []);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		let remainingSeconds = Math.floor(seconds % 60);
		if (remainingSeconds < 10) {
			remainingSeconds = "0" + remainingSeconds;
		}
		return `${minutes}:${remainingSeconds}`;
	};

	useEffect(() => {
		const ended = async () => {
			setPlayerState({
				currentTime: 0,
				duration: 0,
				progress: 0,
			});

			if (isRepeat) {
				return await repeat();
			}

			if (isShuffle) {
				return await shuffle(songList);
			}

			await playNext(songList);
		};

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

const Wrapper = styled.div``;

const Flexbox = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Progress = styled.div`
	width: 51%;
	height: 20px;
	border-radius: 30px;
	background-color: lightgrey;
	margin-top: 10px;
	margin-bottom: 5px;
	cursor: pointer;
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
`;

export default SongActions;
