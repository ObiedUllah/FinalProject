//WEBSITE
const apiBaseUrl = "https://anime-enma.vercel.app/api";

// LOCAL DEVICE
// const apiBaseUrl = "/api";

// ANIME

export const getAnimeList = `${apiBaseUrl}/animes`;

export const getPromosList = `${apiBaseUrl}/promos`;

export const getGenresList = `${apiBaseUrl}/genres`;

export const getRandomAnimeList = `${apiBaseUrl}/animes/random`;

// IMAGE

export const uploadImage = `${apiBaseUrl}/upload`;

// USER

export const createUser = `${apiBaseUrl}/user`;

export const getUsers = `${apiBaseUrl}/users`;

export const getUser = `${apiBaseUrl}/user`;

export const toggleFavorites = `${apiBaseUrl}/user/favorite`;

export const changeStatus = `${apiBaseUrl}/user/status`;

export const removeStatus = `${apiBaseUrl}/user/status`;

export const addSongToList = `${apiBaseUrl}/user/song`;

export const removeSongFromList = `${apiBaseUrl}/user/song`;

// VIDEO

export const getVideo = `${apiBaseUrl}/video`;

export const downloadMp3 = `${apiBaseUrl}/convert-mp3`;

export const getMp3Audio = `${apiBaseUrl}/audio`;
