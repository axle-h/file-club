import util = require("util");
import Country from "./Country";
import Director  from "./Director";
import Genre from "./Genre";
import Actor from './Actor';


export default class Movie {
    path: string
    title: string
    year: number
    actors: Actor[]
    awardNominations: number
    awardWins: number
    countries: Country[]
    director: Director
    genres: Genre[]
    imdbId: string
    imdbRating: number
    imdbVotes: number
    metacritic: number
    plot: string
    poster: string
    rated: string
    released: string
    runtime: string
    tomatoConsensus: string
    tomatoFresh: string
    tomatoImage: string
    tomatoMeter: string
    tomatoRating: string
    tomatoReviews: string
    tomatoUserMeter: string
    tomatoUserRating: string
    tomatoUserReviews: string
        
    constructor(movieFile, omdb) {
        this.path = movieFile.path;
        this.title = omdb.title;
        this.year = omdb.year;
        this.actors = omdb.actors.map(function(name) { return new Actor(name) });
        this.awardNominations = omdb.awards.nominations;
        this.awardWins = omdb.awards.wins;
        this.countries = omdb.countries.map(function(name) { return new Country(name) });
        this.director = new Director(omdb.director);
        this.genres = omdb.genres.map(function(name) { return new Genre(name) });
        this.imdbId = omdb.imdb.id;
        this.imdbRating = omdb.imdb.rating;
        this.imdbVotes = omdb.imdb.votes;
        this.metacritic = omdb.metacritic;
        this.plot = omdb.plot;
        this.poster = omdb.poster;
        this.rated = omdb.rated;
        this.released = omdb.released;
        this.runtime = omdb.runtime;
        this.tomatoConsensus = omdb.tomato.consensus;
        this.tomatoFresh = omdb.tomato.fresh;
        this.tomatoImage = omdb.tomato.image;
        this.tomatoMeter = omdb.tomato.meter;
        this.tomatoRating = omdb.tomato.rating;
        this.tomatoReviews = omdb.tomato.reviews;
        this.tomatoUserMeter = omdb.tomato.userMeter;
        this.tomatoUserRating = omdb.tomato.userRating;
        this.tomatoUserReviews = omdb.tomato.userReviews;
    }
    
    fullName() {
        return util.format('%s (%d)', this.title, this.year);
    }
}