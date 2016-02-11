var fs = require('fs');
var path = require('path');

export interface IConfig {
    moviePath: string;
}

export class Config {
    public moviePath: string;
    
    constructor() {
        var dir = path.dirname(require.main.filename);
        var configFile = path.resolve(dir, "..", "..", "config.json");
        var config: any = JSON.parse(fs.readFileSync(configFile, "utf8"));
        this.moviePath = config.moviePath;
    }
}