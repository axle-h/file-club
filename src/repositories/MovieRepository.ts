var mongojs = require('mongojs');
import { Movie } from "../models/Movie";

export interface IMovieRepository {
    addAll(movies: Movie[], callback: (error: Error, result: Object) => void);
    
    getAll(callback: (error: Error, movies: Movie[]) => void);
    
    getAllPaths(callback: (error: Error, moviePaths: string[]) => void);
}

export class MovieRepository implements IMovieRepository {
    private db;
    
    constructor() {
        this.db = mongojs("mongodb://localhost/file-club", ["Movies"]);
    }
    
    public getAll(callback: (error: Error, movies: Movie[]) => void) {
        this.db.Movies.find((error, docs) => {
            if(error) {
                callback(new Error(error), null);
                return;
            }
            
            callback(null, docs);
        });
    }
    
    public getAllPaths(callback: (error: Error, moviePaths: string[]) => void) {
        this.db.Movies.find({}, { path: true }, (error, docs) => {
            if(error) {
                callback(new Error(error), null);
                return;
            }
            
            var moviePaths = docs.map(x => x.path);
            callback(null, moviePaths);
        });
    }
    
    public addAll(movies: Movie[], callback: (error: Error, result: Object) => void) {
        var bulk = this.db.Movies.initializeOrderedBulkOp();
        
        movies.forEach((movie: Movie) => {
            let tmp: any = movie;
            tmp._id = movie.key();
            bulk.insert(tmp);
        });
        
        bulk.execute((error, result) => {
            if(error) {
                callback(new Error(error), null);
                return;
            }
            
            callback(null, result);
        })
    }
}