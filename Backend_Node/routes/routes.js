import express from "express";

import {
    getFavouriteMovieById,
    createFavouriteMovie,
    updateFavouriteMovie,
    deleteFavouriteMovie,
    allFavouriteMovies
}from "../controllers/preferiti-controllers.js";

const router = express.Router();

router.get('/preferiti', allFavouriteMovies);
router.get('/preferiti/:id', getFavouriteMovieById);
router.post('/preferiti', createFavouriteMovie);
router.put('/preferiti/:id', updateFavouriteMovie);
router.delete('/preferiti/:id', deleteFavouriteMovie);

export default router;

