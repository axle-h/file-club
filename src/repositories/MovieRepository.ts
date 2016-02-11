var mongojs = require('mongojs');
import { Movie } from "../models/Movie";

export interface IMovieRepository {
    insertAll(movies: Movie[], callback: (error: Error, result: Object) => void);
    
    getAll(callback: (error: Error, movies: Movie[]) => void);
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
    
    public insertAll(movies: Movie[], callback: (error: Error, result: Object) => void) {
        var bulk = this.db.Movies.initializeOrderedBulkOp();
        
        movies.forEach((movie: Movie) => {
            let tmp: any = movie;
            tmp._id = movie.path;
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