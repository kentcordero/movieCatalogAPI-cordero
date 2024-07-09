const express = require('express');
const { verify, verifyAdmin } = require('../auth');
const movieController = require('../controllers/movie');
const router = express.Router();

router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);
router.get('/getMovies', verify, movieController.getAllMovies);
router.get('/getMovie/:id', verify, movieController.getMovieById);
router.patch('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);
router.patch('/addComment/:id', verify, movieController.addComment);
router.get('/getComments/:id', verify, movieController.getCommentsByMovieId);

module.exports = router;