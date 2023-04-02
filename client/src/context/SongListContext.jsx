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
		try {
			const response = await fetch(`/api/audio/${song?.theme + " " + song.type + " " + song.title}`);

			if (response.status === 200) {
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
			} else {
				throw new Error("An error occured! Refresh the page or Contact support");
			}
		} catch (error) {
			alert(error);
		}
	};

	/**
	 * Pauses the current song
	 */
	const pause = async () => {
		audioPlayer.pause();

		setCurrentSong({
			...currentSong,
			isPlaying: false,
		});
		setAudioPlayer(audioPlayer);
	};

	/**
	 * Plays the current song
	 */
	const play = async () => {
		audioPlayer.play();

		setCurrentSong({
			...currentSong,
			isPlaying: true,
		});
		setAudioPlayer(audioPlayer);
	};

	/**
	 * goes to the song before if it exists and plays the song
	 * @param {*} songList
	 * @returns
	 */
	const playBefore = async (songList) => {
		// plays the last song if the current song is the first song
		if (currentSong.index === 0) {
			const newSong = songList[songList.length - 1];
			await playCurrentSong(newSong, songList.length - 1);
			return;
		}

		const newSong = songList[currentSong.index - 1];
		await playCurrentSong(newSong, currentSong.index - 1);
	};

	/**
	 * goes to the song after if it exists and plays the song
	 * @param {*} songList
	 * @returns
	 */
	const playNext = async (songList) => {
		// plays the first song if the current song is the last song
		if (currentSong.index === songList.length - 1) {
			const newSong = songList[0];
			await playCurrentSong(newSong, 0);
			return;
		}

		const newSong = songList[currentSong.index + 1];
		await playCurrentSong(newSong, currentSong.index + 1);
	};

	/**
	 * Plays a random song and makes sure that it does not replay the same song
	 * @param {*} songList
	 */
	const shuffle = async (songList) => {
		let index = currentSong.index;
		//checks if new song is the same as current song so that it does not play it again
		while (index === currentSong.index) {
			index = Math.floor(Math.random() * songList.length);
		}
		const newSong = songList[index];
		await playCurrentSong(newSong, index);
	};

	/**
	 * replays the current song
	 */
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
