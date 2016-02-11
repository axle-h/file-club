var express = require('express');
import { IMovieRepository } from "../repositories/MovieRepository"
import { wiring, Binding } from "../infrastructure/Wiring";

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    var movieRepository = wiring.Resolve<IMovieRepository>(Binding.IMovieRepository);
    movieRepository.getAll((error, movies) => {
        if(error) {
            res.render('error', { error: error });
            return;
        }
        
        res.render('index', { title: 'Express', movies: movies });
    });
});

module.exports = router;