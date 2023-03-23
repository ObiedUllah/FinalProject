import { createContext, useState } from "react";

export const SongListContext = createContext(null);

const initialState = {
	theme: null,
	title: null,
	image: null,
	type: null,
	index: null,
	isPlaying: false,
};

export const SongListProvider = ({ children }) => {
	// for drag and drop
	const [widgets, setWidgets] = useState(() => []);

	//for song library
	const [currentSong, setCurrentSong] = useState(initialState);
	const [audioPlayer, setAudioPlayer] = useState(() => new Audio());

	/**
	 * Gets the current song and transforms it into a blob.
	 * Gets the song url and plays it
	 */
	const playCurrentSong = async (song, index) => {
		const response = await fetch(`/api/audio/${song?.theme + " " + song.type + " " + song.title}`);

		//changes the stream to a blob
		const blob = await response.blob();
		//gets  url
		const audioUrl = URL.createObjectURL(blob);
		//creates audio and plays it
		audioPlayer.src = audioUrl;

		if (!audioPlayer.paused) {
			audioPlayer.pause();
		}

		audioPlayer.play();

		setCurrentSong({
			theme: song.theme,
			title: song.title,
			image: song.img,
			type: song.type,
			index: index,
			isPlaying: true,
		});
		setAudioPlayer(audioPlayer);
	};

	const pause = async () => {
		audioPlayer.pause();

		setCurrentSong({
			...currentSong,
			isPlaying: false,
		});
		setAudioPlayer(audioPlayer);
	};

	const play = async () => {
		audioPlayer.play();

		setCurrentSong({
			...currentSong,
			isPlaying: true,
		});
		setAudioPlayer(audioPlayer);
	};

	const playBefore = async (songList) => {
		if (currentSong.index === 0) {
			const newSong = songList[songList.length - 1];
			await playCurrentSong(newSong, songList.length - 1);
			return;
		}

		const newSong = songList[currentSong.index - 1];
		await playCurrentSong(newSong, currentSong.index - 1);
	};

	const playNext = async (songList) => {
		if (currentSong.index === songList.length - 1) {
			const newSong = songList[0];
			await playCurrentSong(newSong, 0);
			return;
		}

		const newSong = songList[currentSong.index + 1];
		await playCurrentSong(newSong, currentSong.index + 1);
	};

	const shuffle = async (songList) => {
		let index = currentSong.index;
		while (index === currentSong.index) {
			index = Math.floor(Math.random() * songList.length);
		}
		const newSong = songList[index];
		await playCurrentSong(newSong, index);
	};

	const repeat = () => {
		setCurrentSong({
			...currentSong,
			isPlaying: true,
		});
		audioPlayer.currentTime = 0;
		audioPlayer.play();
	};

	return (
		<SongListContext.Provider
			value={{
				widgets,
				currentSong,
				audioPlayer,
				actions: {
					setWidgets,
					setCurrentSong,
					playCurrentSong,
					play,
					pause,
					playBefore,
					playNext,
					shuffle,
					repeat,
				},
			}}
		>
			{children}
		</SongListContext.Provider>
	);
};
