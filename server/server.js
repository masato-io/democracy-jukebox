// *** Express ***
const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
const env = require('./env/credentials.js');

// Blocked Loading HTTP Mixed Content on Heroku
app.use(function(req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

// *** Parser ***
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const querystring = require('querystring');

// *** Routes ***
var users = require('./accounts/user');
var playlist = require('./spotify/playlist');
var spotifyHelpers = require('./spotify/spotifyHelpers.js');

app.get('/songs', playlist.FetchSongs);
app.post('/songs', playlist.AddSongToCollections);

app.get('/songs/search', playlist.SearchSongResults);

app.put('/songvote', playlist.RegisterVoteOnSong);
app.delete('/song', playlist.DeleteSong);
app.delete('/collection', playlist.ClearSongCollection);

app.get('/users', users.FetchAllUsers);

// add user to users collection
app.post('/signup', users.NewUserSignUp);

// Host Authentication
app.get('/get_access_token', spotifyHelpers.GetAccessToken);
app.get('/hostLogin', (req, res) => {
	spotifyHelpers.handleHostLogin(req, res);
});

app.get('/callback', (req, res) => {
	spotifyHelpers.redirectAfterLogin(req, res);
});

// *** Static Assets ***
app.use(express.static(path.join(__dirname, './../')));

// serve html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + './../index.html'));
});

// *** Server ***
app.listen(process.env.PORT || 3000, function() {
	console.log('Listening at http://localhost:3000');
});
