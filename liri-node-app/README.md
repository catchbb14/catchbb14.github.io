# liri-node-app

This app serves to show the interaction between the user using node and various API's.

The user has four commands to choose from:
1) node liri.js my-tweets
    This command will display your last 20 tweets, along with the time it was created within the console.
2) node liri.js spotify-this-song '<song-name>'
    This command will retreive the requested song from Spotify's npm package and will return the artist, title, album and a preview link.
3) node liri.js movie-this '<movie-name>'
    This command utilizes the request package to perform a request to OMDB and displays the movie's title, year released, ratings language, plot and actors.
4) node liri.js do-what-it-says
    This command parses the random.txt file in the working director utilizing the fs package. And logs the correct information.