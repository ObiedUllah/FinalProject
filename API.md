Anime Enma API
=========

This is a backend API that provides data on anime, anime genres, and anime-related media. It includes endpoints for fetching the top recent popular upcoming season anime, anime promos, anime genres themes demographics, a random anime category and the top anime of that category, as well as endpoints for user authentication and management, such as adding or removing anime from the user's favorites list, updating anime status, and adding/removing songs to/from the user's song list.

The endpoints can be tested using the following base url:
- https://anime-enma.onrender.com/ 

Examples: 
- https://anime-enma.onrender.com/api/animes
- https://anime-enma.onrender.com/api/video/bleach+opening+2


Dependencies 
---------
- node
- nodemon
- express
- morgan 
- cors
- dotenv
- mongodb 
- node-fetch
- uuidv4
- cloudinary (upload profile images)
- googleapis (search youtube videos)
- ytdl-core (gets audio from youtube)

Endpoints
---------

Here are the available endpoints for this API:

### 1\. Get Anime List:

Endpoint: `GET /api/animes`

    This endpoint gets the top/recent/popular/upcoming/season anime and returns the list.

### 2\. Get Promos List:

Endpoint: `GET /api/promos`

    This endpoint gets the anime promos and returns the list.

### 3\. Get Genres List:

Endpoint: `GET /api/genres`

    This endpoint gets the anime genres themes demographics and returns the list.

### 4\. Get Random Anime List:

Endpoint: `GET /api/animes/random`

    This endpoint gets a random anime category and the top anime of that category and returns the list. Categories include action, adventure, comedy, drama, sports, and shounen.


### 5\. Get Users:

Endpoint: `GET /api/users`

    This endpoint gets all the users and returns the list.

### 6\. Get User by Email:

Endpoint: `GET /api/user/:email`

    This endpoint gets a user by their email and returns the user information.

### 7\. Toggle Favorites:

Endpoint: `PUT /api/user/favorite`

    This endpoint adds or removes an anime from the user's favorites list and returns the updated user information.

### 8\. Change Status:

Endpoint: `PUT /api/user/status`

    This endpoint adds or updates an anime status (completed/plan to watch) from the user's list and returns the updated user information.

### 9\. Remove Status:

Endpoint: `PATCH /api/user/status`

    This endpoint removes an anime from the user's list and returns the updated user information.

### 10\. Add Song to List:

Endpoint: `PUT /api/user/song`

    This endpoint adds a song to the user's song list and returns the updated user information.

### 11\. Remove Song from List:

Endpoint: `PATCH /api/user/song/:id`

    This endpoint removes a song from the user's song list and returns the updated user information.

### 12\. Upload Image:

Endpoint: `POST /api/upload`

    This endpoint uploads an image onto Cloudinary and adds the image URL to MongoDB.

### 13\. Get Video:

Endpoint: `GET /api/video/:string`

    This endpoint gets a video from YouTube by searching for a title with a string from the frontend and returns the video information.

### 14\. Download MP3:

Endpoint: `POST /api/convert-mp3`

    This endpoint converts a YouTube video to MP3 and returns the converted file. The endpoint requires the YouTube video ID to be sent in the request body.

### 15\. Get MP3 Audio:

Endpoint: `GET /api/audio/:string`

    This endpoint gets an MP3 audio file by searching for a title with a string from the frontend and returns the audio file.


