var express = require('express');
import MovieService from "../services/MovieService"

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    var movieService = new MovieService("/home/alex/Videos");
    movieService.scrapeAllMovies(function(err, movies) {
        if(err) {
            res.render('error', { error: err });
        }
        
        res.render('index', { title: 'Express', movies: movies });
    });
});

module.exports = router;
