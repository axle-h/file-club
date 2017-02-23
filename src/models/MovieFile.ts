import util = require("util");

export class MovieFile {
    constructor(public path: string, public title: string, public year: number) {
    }
    
    /**
     * Gets an key for use as an identifier for this movie file. 
     */
    public key(): string {
        var titleKey = this.title.toLowerCase().replace(/[^a-z0-9]+/, "-");
        return util.format('%s-%d', titleKey, this.year);
    }
}