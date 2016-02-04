var omdb = require("omdb");
import fs = require("fs");
import async = require("async");
import MovieFile from "../models/MovieFile";
import Movie from "../models/Movie";

export default class MovieService {
    path: string;
    
    constructor(path) {
        this.path = path;
    }
    
    scrapeAllMovies(callback) {
        fs.readdir(this.path, (err, files) => {
            if(err) {
                callback(err);
                return;
            }
            
            this.scrapeMovies(files, callback);
        });
    }
    
    /**
     * Scrape a movie file from OMDB.
     * 
     * @param {MovieFile} movieFile the movie file to scrape.
     * @param callback the callback.
     */
    scrapeMovie(movieFile: MovieFile, callback) {
        omdb.get(movieFile, { fullPlot: true, tomatoes: true }, (err, result) => {
            if(err) {
                callback(err);
                return;
            }
            
            var movie = new Movie(movieFile, result)
            callback(null, movie);
        });
    }
    
    scrapeMovies(fileNames: string[], callback) {
        var pattern = /^(.+)\s+\((\d{4})\)$/;
    
        var movieFiles = [];
        for (var i = 0; i < fileNames.length; i++) {
            let file = fileNames[i];
                                    
            let match = pattern.exec(file);
            if (!match) {
                console.info("Ignoring badly formatted file: " + file);
                continue;
            }
                
            let title = match[1];
            let year = match[2];
            let movie = new MovieFile(file, title, year);
            movieFiles.push(movie);
        }
        
        if(movieFiles.length == 0) {
            callback(new Error("No movies found"));
            return;
        }
        
        var functions = movieFiles.map((movieFile) => {
            return (callback) => {
                this.scrapeMovie(movieFile, callback);
            }
        });
        
        async.series(functions, (err, movies) => {
            callback(null, movies);
        });
    }
}