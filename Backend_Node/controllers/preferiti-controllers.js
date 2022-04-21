import FilmPreferito from "../models/preferiti.js";

export const allFavouriteMovies = async (req, res) => {
    try {
        const movie = await FilmPreferito.findAll(); 
        res.send(movie);
    } catch (err) {
        console.log(err);
    }
}

export const getFavouriteMovieById = async (req, res) => {
    try {
        const movie = await FilmPreferito.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if (movie) {
            res.send(movie);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createFavouriteMovie = async (req, res) => {
    try {
        await FilmPreferito.create(req.body);
        res.json({
            "message": "Film aggiunto ai preferiti"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const updateFavouriteMovie = async (req, res) => {
    try {
        await FilmPreferito.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Film modificato correttamente"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteFavouriteMovie = async (req, res) => {
    try {
        await FilmPreferito.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Film Preferito cancellato"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}