export default class MovieFile {
    path: string
    title: string
    year: number
    
    constructor(path, title, year) {
        this.path = path;
        this.title = title;
        this.year = year;
    }
}