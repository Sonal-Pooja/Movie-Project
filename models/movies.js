var mongoose = require('mongoose');
var Schema = mongoose.Schema;
MovSchema = new Schema({
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    poster:String,
    metacritic:Number,
    rated : String,
    title: String,
    fullplot: String,
    languages: [String],
    released : {type:Date},
    directors: [String],
    writers: [String],
    awards: {
      wins: Number,
      nominations: Number,
      text: String
    },
    lastupdated: String,
    year: Number,
    imdb: {
      rating: Number,
      votes: Number,
      id: Number
    },
    tomatoes:{
      boxOffice:String,
      consensus : String,
      fresh : Number,
      lastUpdated : {type:Date},
      production : String,
      rotten : Number,
      website:String,
      viewer:{
          rating:Number,
          numReviews:Number,
          meter:Number
            },
      dvd:{type:Date},
      critic:{
          rating:Number,
          numReviews:Number,
          meter:Number
            }
      },
    countries: [String],
    type: String,
    num_mflix_comments: Number
  });
module.exports = mongoose.model('Movies', MovSchema);