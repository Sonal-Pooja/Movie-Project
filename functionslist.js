/*********************************************************************************
* ITE5315 – Project
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Group member Name: Sonal Pooja     Student ID: N01474010   Date: Nov 30, 2022
* Group member Name: Sethu Madhava   Student ID: N01445828   Date: Nov 30, 2022
*********************************************************************************/ 
var express  = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');
var Movies = require('./models/movies');
var bcrypt= require('bcrypt')


async function validateUser(username,password){
    // bcrypt.hash(password, 7).then(hash=>{
    //     //Hash the password using a Salt that was generated using 10 rounds
    //     console.log(hash)
    //     // TODO: Store the resulting "hash" value in the DB
    //     })
    //     .catch(err=>{
    //     console.log(err); // Show any errors that occurred during the process
    // });
    if(process.env.USERNAME1 == username)
    {
        var result = await bcrypt.compare(password,process.env.SECRETKEY);
        return await result;
    }
    else{
        return false;
    }
}

async function initialise(url){
    try {
        await mongoose.connect(url);
        return true;
    } catch (error) {
        return console.error(error);
    }   
}

async function addNewMovieData(movieData){
    create = Movies.create(movieData);
    console.log(create);
    allMovies = await Movies.find();
    return allMovies;
}

async function updateMovieById(movieData,Id){
    try {
        await Movies.findByIdAndUpdate(Id, movieData);
        return Movies.findById(Id);
    } catch (error) {
        console.log(error);
    }
}

async function deleteMovieById(Id){
    try {
        await Movies.findByIdAndDelete(Id);
        return true;
    } catch (error) {
        return false;
    }
}

// function to search movies by id
async function getMovieById(id){
    try{
        var movieData = await Movies.findById(id);
        console.log(movieData);
        return movieData; 
    }catch(error){
        return console.error(error);
    }
};

// function to get movies 
async function getAllMovies(page,perPage,title){
    try {
        var checkTitle = {}
        var first = (page - 1) * perPage;  // to match the index of the array and page

       var movie = Movies.find()

       if(title){
        movie = movie.where({title: {$regex: '.*' + title + '.*'}})
       }

       let data = await movie.sort('_id') 
            .skip(first)    
            .limit(perPage)            
            return data;
        }catch (error) {
        console.error(error);
    }
}

module.exports = {
    validateUser :validateUser,
    initialise : initialise,
    getMovieById: getMovieById,
    getAllMovies: getAllMovies,  
    addNewMovieData : addNewMovieData,
    updateMovieById : updateMovieById,
    deleteMovieById : deleteMovieById
}