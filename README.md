# Anime Enma

## Table of Contents

- [Website Link](#link)
- [Description](#description)
- [Installation](#installation)
- [Website Functionality](#functionality)
  1. [Navbar](#nav)
  2. [Update Section](#update)
  3. [Left SideBar](#left)
  4. [Right SideBar](#right)
  5. [Footer](#footer)
  6. [Home Page](#home)
  7. [Anime Details Page](#details)
  8. [Search Page](#search)
  9. [Genres Page](#genres)
  10. [Promos Page](#promos)
  11. [Profile Page](#profile)
  12. [Song Library Page](#library)
## <a id="link"></a> Website Link

<https://anime-enma.onrender.com/>

-> takes a bit of time to load

## <a id="description"></a> Description

Anime Enma allows users to view some of the top/recent/upcoming/popular anime and get details about each anime, including opening and ending themes. Users can create profiles, favorite anime, rate anime, change profile pictures, add songs to their playlists, and listen to those songs. My goal is to provide a platform where anime fans can discover new shows, share their favorites and listen to their favorite themes. hope you enjoy using my website!

## <a id="installation"></a> Installation

Anime Enma is a MERN (MongoDB, Express, React, Node) application that utilizes the following APIs:

- Jikan API
- Auth 0 API
- AnimeChan API
- Rapid API (YT download)
- YT search API
- Cloudinary API
- Slider API

To be able to run the project locally, you will need the following env variables:

.env in server:

- MONGO_URI
- API_KEY (rapid api)
- API_HOST (rapid api)
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_NAME
- YOUTUBE_API_KEY

.env in frontend:

- REACT_APP_AUTH0_DOMAIN
- REACT_APP_AUTH0_CLIENT_ID

After adding those environment variables, you will have to go into the server and run the `import` file inside of the batch folder. This will allow to store anime data into your mongo database Then you should be able to run the application by running the client and the server.

Due to the limitations of the Jikan API, which only allows 3 calls per second, some of the anime lists are added to a MongoDB database. This helps to bypass the API's rate limit and ensures that the data can be retrieved and displayed on the website without any delays or errors. By storing the anime lists locally, the website can provide a faster and more reliable user experience, while also reducing the load on the API server.

## <a id="functionality"></a> Website Functionality

### <a id="nav"></a> Nav Bar

---

The `Navigation Bar` is an essential part of the AnimeEnma application, and it is located at the top of every page. When a user is not logged in, the NavBar displays the application logo and title, which allows users to navigate back to the main page.

![NavBar Not logged in](https://i.imgur.com/zlYo9lq.png)

The NavBar also has a search bar feature that enables users to search for any anime name, but it only works with the Japanese names. It is important to note that clicking on the search button will only search for anime if there is text in the search box.

The login button, located on the right side of the NavBar, sends the user to Auth0's login form, where they can log in to their AnimeEnma account.

When a user logs in to AnimeEnma, the NavBar displays additional features, including a library button that routes the user to their song library of anime themes. Additionally, there is a user profile image that redirects them to their profile page, where they can view all their completed and favorited animes.

![NavBar logged in](https://i.imgur.com/xbefiAf.png)

### <a id="update"></a> Update Section

---

Under the navigation bar, you'll find a `small div` that informs the user that the mobile version of the app is currently in development and will be available soon. This div animates across the page from right to left and then back again, catching the user's attention and providing a clear indication that the app is still actively being improved.

![Left Side Bar](https://i.imgur.com/j2ek2PZ.png)

### <a id="left"></a> Left SideBar

---

The `left sidebar` is a section of the web application that displays the top-rated anime of all time. This section allows users to easily discover the most popular anime titles and can be accessed from any page of the application. The top-rated anime are displayed in descending order based on their score, with the highest rated anime at the top of the list. Clicking on an anime routes to the details page of that anime.

![Left Side Bar](https://i.imgur.com/zHbuWz0.png)

### <a id="right"></a> Right SideBar

---

The Right Sidebar is divided into three different sections, each serving a unique purpose:

- Navigation Tabs: At the top of the sidebar, there are five different tabs that take the user to various pages of the website.

- Songs and Quotes Tabs: Directly underneath the navigation tabs, there are two tabs that allow the user to switch between viewing their saved anime theme songs or some random anime quotes.

- The first tab displays the user's saved anime theme songs, while the second tab shows some random anime quotes. When a user is not logged in, it tells the user to log in to view their liked songs. The user can drag and drop themes in the box which allows them to save the songs and listen to them in the song library.

![Right Side Bar Songs](https://i.imgur.com/AEwfFb1.png)
![Right Side Bar Quotes](https://i.imgur.com/I9kRM8a.png)

### <a id="footer"></a> Footer

---

The Footer is composed of five different sections:

- Contact section, which provides a way to get in touch with the website's owner.
- Information section, which contains links to important pages on the website.
- User section, which allows the user to quickly sign up, log in, log out, or access their profile page.
- APIs section, which lists all the APIs used on the website.
- Theme section, which provides an option to switch to light mode.

![Footer](https://i.imgur.com/2M5PWbB.png)

### <a id="home"></a> Home Page

---

The Home page presents users with 5 different lists of anime:

- The first list displays 5 hand-picked anime titles, which are showcased sequentially after a few seconds.

![Best Picks](https://i.imgur.com/Sng5UFO.png)

- The remaining 4 lists are sliders showcasing the top, popular, recent, and drama anime titles. By clicking on any anime title, users are directed to its details page.

![Anime Lists](https://i.imgur.com/eOR6bse.jpeg)

### Anime Details Page

---

The anime details page features a prominent YouTube player at the top, showcasing the anime's opening or ending theme. Above the player, the page displays the anime's title in English and Japanese. Users can easily switch between different themes by selecting them from a list located beneath the YouTube player.

![youtube player](https://i.imgur.com/RwRDzLZ.png)

![themes list](https://i.imgur.com/cxHCaGI.png)

- This componenet  allows logged-in users to save an anime to their personal list or mark it as a favorite. This feature provides a personalized experience for each user and makes it easy to keep track of their favorite shows.

![Add anime](https://i.imgur.com/0vP5sys.png)

- This component displays  detailed information about each anime. This includes statistics, a synopsis, background information, episode listings, relations, and recommendations. A zoomed-out image of the anime's details is provided, giving users a comprehensive overview of the anime without overwhelming them with too much information at once.

![Details](https://i.imgur.com/CtRZ2Uv.png)

### <a id="search"></a> Search Page

---

the search page allows users to view what they have searched for in the navbar. There is also pagination on the bottom for the user to view more animes.

![Search list](https://i.imgur.com/EwwUWW6.png)
![Pagination](https://i.imgur.com/I9Cmsuc.png)

### <a id="genres"></a> Genres Page

---

The genres pages displays all the different genres, themes and demographics. Clicking on one of them will go to the search page and get the most popular anime of that genres.

![Genres](https://i.imgur.com/xMzO8uw.png)

### <a id="promos"></a> Promos Page

---

The promos page allows users to see the newest animes or pormotions. clicking on one of them changes the youtube player below. 

![Promos](https://i.imgur.com/B6HZG6r.png)
### <a id="profile"></a> Profile Page

---

The profile page displays information about the user and their anime lists.

- At the top of the page, the user's profile picture is displayed, along with their username and other stats, such as the number of animes they've watched, completed, and added to their favorites. The user can easily change their profile picture by clicking on the image and selecting a new one from their computer.

![Info](https://i.imgur.com/7qN1xhw.png)

- The completed, plan to watch, and favorite animes of the user are also displayed on the page, providing a quick and easy way to access their activity on the platform by clicking on the selected tab.

![Commpleted](https://i.imgur.com/4IsthzZ.png)

![Plan  To Watch](https://i.imgur.com/DfJvina.png)

![Favorites](https://i.imgur.com/ZSwHL2G.png)

### <a id="library"></a> Song Library

---

The song library is a fully-functional music player, comparable to platforms like Spotify or Apple Music. Users can play, pause, skip, repeat, and shuffle songs with ease. Additionally, users can select any song from the list of available tracks simply by clicking on its name. The player also allows users to adjust the volume to their desired level.

![Library](https://i.imgur.com/w43gAe7.png)

![Library 2](https://i.imgur.com/oFtTjRA.png)