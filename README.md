# Liri-node-app

Liri which stands for Language Interpretation and Recognition Interface is an application that does a number of functions you ask it to perform via the command-line interface. You can ask it to display your latest 20 tweets, you can ask it to display information on any song or movie. These instructions to Liri can also be supplied via a text file, random.txt.


## Objective

In Liri, the objective is to showcase the use of the npm ecosystem. We are not required to re-invent the wheel, if someone has shared a brilliant solution through npm, we can use that solution in our code. Please refer to the package.json to see the module dependencies. 

1.  Tweets:- To display tweets, execute the command 'node liri my-tweets'
    
2.  Songs:- To display information on songs, execute the command 'node liri spotify-this-song <name of the song>'
    Replace <name of the song> with the track name, for example, node liri spotify-this-song shake it off. If no song is typed, liri will pick up a default song 'The Sign' by Ace of Base.

3.  Movies:- To display information on movies, execute the command 'node liri movie-this <name of the movie>'
    Replace <name of the movie> with the movie name, for example, node liri movie-this Die Another Day

4.  Taking commands through a file:- A file, named as random.txt can be used to supply commands to liri.
    To use a file, execute the command 'node liri do-what-it-says'. Inside the text file, the commands described in point 1 to 3 can be typed, one at a time.

	
## Setup

To execute liri on your computer, follow the procedure below

1.  git clone https://github.com/samsonmarikwa/liri-node-app to your computer.

2.  Create a .env file with the following entries
    ## Spotify API keys
    SPOTIFY_ID=\<your spotify id\>
    SPOTIFY_SECRET=\<your spotify secret code\>

    ## Twitter API keys
    TWITTER_CONSUMER_KEY=\<your twitter consumer key\>
    TWITTER_CONSUMER_SECRET=\<your twitter consumer secret\>
    TWITTER_ACCESS_TOKEN_KEY=\<your twitter access token key\>
    TWITTER_ACCESS_TOKEN_SECRET=\<your twitter access token secret\>

    ## OMBD API key
    OMDB_API_KEY=\<your OMDB API key\>

3.  The codes can be obtained from https://developer.spotify.com/my-applications for the Spotify API keys.
    http://www.omdbapi.com/apikey.aspx for the OMDB API key\n
    https://apps.twitter.com/app/new for the Twitter API keys
	
	
## Videos

You can access the videos on the setup and execution of the Bamazon programs on [Google Drive](https://drive.google.com/drive/folders/1AvKI0r8PcrNBCIans32TF9Znfu0pP-Ht?usp=sharing)
  