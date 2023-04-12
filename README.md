# FinalProject

Website link
============

<https://anime-enma.onrender.com/>

-> takes a bit of time to load

Description
============

Anime Enma allows users to view some of the top/recent/upcoming/popular anime and get details about each anime, including opening and ending themes. Users can create profiles, favorite anime, rate anime, change profile pictures, add songs to their playlists, and listen to those songs. My goal is to provide a platform where anime fans can discover new shows, share their favorites and listen to their favorite themes. hope you enjoy using my website!

Installation
============

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

Website Functionality
============

## Nav Bar

---

The `Navigation Bar` is an essential part of the AnimeEnma application, and it is located at the top of every page. When a user is not logged in, the NavBar displays the application logo and title, which allows users to navigate back to the main page.

![NavBar Not logged in](https://i.imgur.com/zlYo9lq.png)

The NavBar also has a search bar feature that enables users to search for any anime name, but it only works with the Japanese names. It is important to note that clicking on the search button will only search for anime if there is text in the search box.

The login button, located on the right side of the NavBar, sends the user to Auth0's login form, where they can log in to their AnimeEnma account.

When a user logs in to AnimeEnma, the NavBar displays additional features, including a library button that routes the user to their song library of anime themes. Additionally, there is a user profile image that redirects them to their profile page, where they can view all their completed and favorited animes.

![NavBar logged in](https://i.imgur.com/xbefiAf.png)

## Update Section

---

Under the navigation bar, you'll find a `small div` that informs the user that the mobile version of the app is currently in development and will be available soon. This div animates across the page from right to left and then back again, catching the user's attention and providing a clear indication that the app is still actively being improved.

![Left Side Bar](https://i.imgur.com/j2ek2PZ.png)

## Left SideBar

---

The `left sidebar` is a section of the web application that displays the top-rated anime of all time. This section allows users to easily discover the most popular anime titles and can be accessed from any page of the application. The top-rated anime are displayed in descending order based on their score, with the highest rated anime at the top of the list. Clicking on an anime routes to the details page of that anime.

![Left Side Bar](https://i.imgur.com/zHbuWz0.png)

## Right SideBar

---

The Right Sidebar is divided into three different sections, each serving a unique purpose:

- Navigation Tabs: At the top of the sidebar, there are five different tabs that take the user to various pages of the website.

- Songs and Quotes Tabs: Directly underneath the navigation tabs, there are two tabs that allow the user to switch between viewing their saved anime theme songs or some random anime quotes.

- The first tab displays the user's saved anime theme songs, while the second tab shows some random anime quotes. When a user is not logged in, it tells the user to log in to view their liked songs

![Right Side Bar Songs](https://i.imgur.com/AEwfFb1.png)
![Right Side Bar Quotes](https://i.imgur.com/I9kRM8a.png)

## Footer

---

The Footer is composed of five different sections:

- Contact section, which provides a way to get in touch with the website's owner.
- Information section, which contains links to important pages on the website.
- User section, which allows the user to quickly sign up, log in, log out, or access their profile page.
- APIs section, which lists all the APIs used on the website.
- Theme section, which provides an option to switch to light mode.

![Footer](https://i.imgur.com/2M5PWbB.png)

## Home Page

---

The Home page presents users with 5 different lists of anime:

- The first list displays 5 hand-picked anime titles, which are showcased sequentially after a few seconds.

![Best Picks](https://i.imgur.com/Sng5UFO.png)

- The remaining 4 lists are sliders showcasing the top, popular, recent, and drama anime titles. By clicking on any anime title, users are directed to its details page.

![Anime Lists](https://i.imgur.com/eOR6bse.jpeg)

## Anime Details Page

---

## Search Page

---

## Genres Page

---

## Promos Page

---

## Profile Page

---

## Song Library

---
