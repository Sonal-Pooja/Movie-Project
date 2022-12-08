/*********************************************************************************
* ITE5315 – Project
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Group member Name: Sonal Pooja     Student ID: N01474010   Date: Nov 30, 2022
* Group member Name: Sethu Madhava   Student ID: N01445828   Date: Nov 30, 2022
********************************************************************************/ 
require('dotenv').config()                // to include .env file
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var port     = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//Add express handlebar
const exphbs = require('express-handlebars');

const HBS = exphbs.create({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
});

app.engine('.hbs', HBS.engine)
app.set('view engine', '.hbs')

var path = require('path');
app.use(express.static(path.join(__dirname,'public')));

//mongoose.connect(database.url);
var Movies = require('./models/movies');

//Calling the path where all the function are available.
var FunctionsList = require('./functionslist');

//Login route
app.get("/", async function(req,res){
	res.render('loginpage');
})

app.post("/", async function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	var checkpoint = await FunctionsList.validateUser(username,password);
	console.log("validate");
	console.log(checkpoint);
	if(await checkpoint == true)
	{
		await res.render('success');
	}
	else{
		await res.render('failure');
	}

})

//Creating an async function to connect the database
var url = database.url;
var connection = FunctionsList.initialise(url);
if(connection){
	app.listen(port);
	console.log("App listening on port : " + port);
}
else{
	console.log(connection);
}



//Creating a POST method for adding a new movie into the database
app.post('/api/createmovie', async function(req,res){
	//Creating a collection to hold the data
	var movieData = {
		plot: req.body.plot,
		genres: req.body.genres,
		runtime: req.body.runtime,
		cast: req.body.cast,
		poster:req.body.poster,
		metacritic:req.body.metacritic,
		rated : req.body.rated,
		title: req.body.title,
		fullplot: req.body.fullplot,
		languages: req.body.languages,
		released : req.body.released,
		directors: req.body.directors,
		writers: req.body.writers,
		awards: {
		wins: req.body.wins,
		nominations: req.body.nominations,
		text: req.body.text
		},
		lastupdated: req.body.lastupdated,
		year: req.body.year,
		imdb: {
		rating: req.body.rating,
		votes: req.body.votes,
		id: req.body.id
		},
		tomatoes:{
		boxOffice:req.body.boxOffice,
		consensus : req.body.consensus,
		fresh : req.body.fresh,
		//lastUpdated : req.body.lastUpdated,
		production : req.body.production,
		rotten : req.body.rotten,
		website:req.body.website,
		viewer:{
			rating:req.body.viewerrating,
			numReviews:req.body.viewernumReviews,
			meter:req.body.viewermeter
				},
		dvd:req.body.dvd,
		critic:{
			rating:req.body.criticrating,
			numReviews:req.body.ctiticnumReviews,
			meter:req.body.criticmeter
				}
		},
		countries: req.body.countries,
		type: req.body.type,
		num_mflix_comments: req.body.num_mflix_comments
	}
	//displying the data in the console
	console.log(movieData);
	var output= await FunctionsList.addNewMovieData(movieData);
	console.log(output);
	res.send(output);
});

//Creating a PUT method for updating a movie in the database
app.put('/api/updatemovie/:id', async function(req,res){
	var movieData = {
		plot: req.body.plot,
		genres: req.body.genres,
		runtime: req.body.runtime,
		cast: req.body.cast,
		poster:req.body.poster,
		metacritic:req.body.metacritic,
		rated : req.body.rated,
		title: req.body.title,
		fullplot: req.body.fullplot,
		languages: req.body.languages,
		released : req.body.released,
		directors: req.body.directors,
		writers: req.body.writers,
		awards: {
		wins: req.body.wins,
		nominations: req.body.nominations,
		text: req.body.text
		},
		lastupdated: req.body.lastupdated,
		year: req.body.year,
		imdb: {
		rating: req.body.rating,
		votes: req.body.votes,
		id: req.body.id
		},
		tomatoes:{
		boxOffice:req.body.boxOffice,
		consensus : req.body.consensus,
		fresh : req.body.fresh,
		//lastUpdated : req.body.lastUpdated,
		production : req.body.production,
		rotten : req.body.rotten,
		website:req.body.website,
		viewer:{
			rating:req.body.viewerrating,
			numReviews:req.body.viewernumReviews,
			meter:req.body.viewermeter
				},
		dvd:req.body.dvd,
		critic:{
			rating:req.body.criticrating,
			numReviews:req.body.ctiticnumReviews,
			meter:req.body.criticmeter
				}
		},
		countries: req.body.countries,
		type: req.body.type,
		num_mflix_comments: req.body.num_mflix_comments
	}
	var Id = req.params.id;
	console.log(movieData);
	var output = await FunctionsList.updateMovieById(movieData,Id);
	console.log(output);
	res.send(output);
})

//Creating a DELETE method for deleting a movie in the database
app.delete('/api/deletemovie/:id', async function(req,res){
	var Id = req.params.id;
	var output = await FunctionsList.deleteMovieById(Id);
	if(output){
		console.log("Successfully Deleted the movie!");
		res.send("Successfully Deleted the movie!")
	}
	else{
		console.log("Couldn't delete the Movie")
	}
})

//get movie as per id using form
app.get("/api/movies/id",(req,res)=>{    
    res.render('searchMovieById'); 
});

app.post('/searchId', async function(req, res) {
	    var id = req.body.id;
	    var movie = await FunctionsList.getMovieById(id);
		if(movie)
		{
			res.render('showMovies',{
				moviedata:movie
			})
		}
		else{
			console.log("Movie with id: "+id+" not found!");
		}
	});

//get movie data from db as per id
// app.get('/api/movies/:id', async function(req, res) {
//     var id = req.params.id;
//     var movie = await FunctionsList.getMovieById(id);
// 	if(movie)
// 	{
// 		res.render('showMovies',{
// 			moviedata:movie
// 		})
// 	}
// 	else{
// 		console.log("Movie with id: "+id+" not found!");
// 	}
// });

//get movies as per page, perPage and title

app.get("/api/movies",(req,res)=>{    
    res.render('titleForm'); 
});

app.post("/movieData",async (req,res) => { 
    page = req.body.page;
    perPage = req.body.perPage;
    title = req.body.title;

    var data = await FunctionsList.getAllMovies(page, perPage, title);
	console.log(data);
	res.render('showMovies', {moviedata: data});
  }
)

