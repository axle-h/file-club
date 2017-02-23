import { MovieFile } from './MovieFile';

export class Movie extends MovieFile {
    public actors: string[];
    public awardNominations: number;
    public awardWins: number;
    public countries: string[];
    public director: string;
    public genres: string[];
    public imdbId: string;
    public imdbRating: number;
    public imdbVotes: number;
    public metacritic: number;
    public plot: string;
    public poster: string;
    public rated: string;
    public released: string;
    public runtime: number;
    public tomatoConsensus: string;
    public tomatoFresh: number;
    public tomatoImage: string;
    public tomatoMeter: number;
    public tomatoRating: number;
    public tomatoReviews: number;
    public tomatoUserMeter: number;
    public tomatoUserRating: number;
    public tomatoUserReviews: number;
        
    constructor(movieFile: MovieFile, omdb) {
        super(movieFile.path, omdb.title, omdb.year)
        
        this.actors = omdb.actors;
        this.awardNominations = omdb.awards.nominations;
        this.awardWins = omdb.awards.wins;
        this.countries = omdb.countries;
        this.director = omdb.director;
        this.genres = omdb.genres;
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
}