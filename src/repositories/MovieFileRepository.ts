import fs = require("fs");
import { MovieFile } from "../models/MovieFile";
import { IConfig } from "../config/Config";
import { Inject } from "inversify";

export interface IMovieFileRepository {
    parseAllMovieFiles(callback: (error: Error, movieFiles: MovieFile[]) => void);
}

@Inject("IConfig")
export class MovieFileRepository implements IMovieFileRepository {
    
    constructor(private config: IConfig) {
    }
    
    public parseAllMovieFiles(callback: (error: Error, movieFiles: MovieFile[]) => void) {
        fs.readdir(this.config.moviePath, (err, files) => {
            if(err) {
                callback(err, null);
                return;
            }
            
            this.parseFileNames(files, callback);
        });
    }
    
    private parseFileNames(fileNames: string[], callback: (error: Error, movieFiles: MovieFile[]) => void) {
        const pattern = /^(.+)\s+\((\d{4})\)$/;
    
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
            callback(new Error("No movies found"), null);
            return;
        }
        
        callback(null, movieFiles);
    }
}