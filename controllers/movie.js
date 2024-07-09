const Movie = require('../models/Movie');

const bcrypt = require('bcryptjs');
// const auth = require('../auth');

module.exports.addMovie = (req, res) => {
    const { title, director, year, description, genre } = req.body;
    try {
        // Check if logged-in User is Admin
        if (req.user.isAdmin) {
            const newMovie = new Movie({
                title,
                director,
                year,
                description,
                genre,
            });

            return newMovie.save().then((movie) => res.status(201).send(movie)).catch(err => {
                console.error('Error in saving movie:', err);
                return res.status(500).send({ error: 'Error in saving movie '});
            })
        // User is not Admin
        } else {
            res.status(500).send('No admin privilege to add a movie');
        }
    } catch (err) {
        console.error('Error in saving movie: ', err);
        return res.status(500).send({ error: 'Error in saving movie '});
    }
};

module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({}).then(movies => movies);
        return res.status(200).send({ movies });
    } catch (err) {
        console.error('Error in finding movies:', err);
        return res.status(400).send({ error: 'Error in finding movies' });
    }
}

module.exports.getMovieById = async (req, res) => {
    const movieId = req.params.id;
    try {
        // Find movie by id
        const movie = await Movie.findById(movieId).then((movie) => movie);
        return res.status(200).send(movie);
    } catch (err) {
        console.error('Error in finding movie:', err);
        return res.status(400).send({ error: 'Error in finding movie' });
    }
}

module.exports.updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const { title, director, year, description, genre } = req.body;
    try {
        // Check if logged-in user is Admin
        if (req.user.isAdmin) {
            // Find movie by id and update
            const updatedMovie = await Movie.findByIdAndUpdate(
                movieId,
                { title, director, year, description, genre },
                { new: true },
            );

            return res.status(200).send({ message: 'Movie updated successfully', updatedMovie });
        // User is not admin
        } else {
            res.status(500).send('No admin privilege to update a movie');
        }
    } catch (err) {
        console.error('Error in updating movie:', err);
        return res.status(400).send({ error: 'Error in updating movie' });
    }
}

module.exports.deleteMovie = async (req, res) => {
    const movieId = req.params.id;
    try {
        // Check if logged-in user is Admin
        if (req.user.isAdmin) {
            const deletedMovie = await Movie.findByIdAndDelete(movieId).then(movie => {
                return res.status(200).send({ message: 'Movie deleted successfully' })
            })
        } else {
            res.status(500).send('No admin privilege to delete a movie');
        }
    } catch (err) {
        console.error('Error in deleting movie:', err);
        return res.status(400).send({ error: 'Error in deleting movie' });
    }
}

module.exports.addComment = async (req, res) => {
    const movieId = req.params.id;
    const userId = req.user.id;
    const { comment } = req.body; 
    const formattedComment = {
        userId,
        comment,
    }
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            { $push: { comments: formattedComment }},
            { new: true }
        );

        return res.status(200).send({ message: 'Comment added successfully', updatedMovie });
    } catch (err) {
        console.error('Error in saving comment:', err);
        return res.status(400).send({ error: 'Error in saving comment' });
    }
}

module.exports.getCommentsByMovieId = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findById(movieId).then(movie => movie);
        return res.status(200).send({ comments: movie.comments });
    } catch (err) {
        console.error('Error in finding comments:', err);
        return res.status(400).send({ error: 'Error in finding comments' });
    }
}