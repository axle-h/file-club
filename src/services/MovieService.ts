var omdb = require("omdb");
import async = require("async");
import { MovieFile } from "../models/MovieFile";
import { Movie } from "../models/Movie";
import { Inject } from "inversify";
import { IMovieFileRepository } from "../repositories/MovieFileRepository"
import { IMovieRepository } from "../repositories/MovieRepository"

export interface IMovieService {
    scrapeAllMovies(callback: (error: Error, result: boolean) => void);
}

@Inject("IMovieFileRepository", "IMovieRepository")
export class MovieService implements IMovieService {
    
    constructor(private movieFileRepository: IMovieFileRepository, private movieRepository: IMovieRepository) {
        
    }
    
    public scrapeAllMovies(callback: (error: Error, result: boolean) => void) {
        this.movieRepository.getAllPaths((error: Error, moviePaths: string[]) => {
            if(error) {
                callback(error, null);
                return;
            }
                        
            this.movieFileRepository.parseAllMovieFiles(moviePaths, (error: Error, movieFiles: MovieFile[]) => {
                if(error) {
                    callback(error, null);
                    return;
                }

                if(movieFiles.length == 0) {
                    callback(new Error("No movies found"), null);
                    return;
                }

                var functions = movieFiles.map((movieFile) =>
                    (callback: (error: Error, movie: Movie) => void) => this.scrapeMovie(movieFile, callback));

                async.series(functions, (error, movies) => {
                    if(error) {
                        callback(error, null);
                        return;
                    }
                    
                    movies = movies.filter(x => x != null);
                    if(movies.length == 0) {
                        callback(new Error("No movies found"), null);
                        return;
                    }
                    
                    this.movieRepository.addAll(movies, (error: Error, result: boolean) => {
                        callback(error, result);
                    });
                });
            });
        });
    }
    
    /**
     * Scrape a movie file from OMDB.
     * 
     * @param {MovieFile} movieFile the movie file to scrape.
     * @param callback the callback.
     */
    private scrapeMovie(movieFile: MovieFile, callback: (error: Error, movie: Movie) => void) {
        omdb.get(movieFile, { fullPlot: true, tomatoes: true }, (error, result) => {
            if(error) {
                callback(new Error(error), null);
                return;
            }
            
            if(result) {
                var movie = new Movie(movieFile, result)
                callback(null, movie);
                return;
            }
            
            console.error(new Error(movieFile.path + " not found on omdb"));
            callback(null, null);
        });
    }
}