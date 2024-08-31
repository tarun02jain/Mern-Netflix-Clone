import express from "express";
import { getMovieByCategory, getMovieDetails, getMovieTrailers, getSimilarMovies, getTrendingMovie } from "../controllers/tmdbController.js";
const router = express.Router();

router.get('/trendings' , getTrendingMovie);
router.get('/:id/trailers', getMovieTrailers);
router.get('/:id/details', getMovieDetails);
router.get('/:id/similar' , getSimilarMovies);
router.get('/:category' , getMovieByCategory);

export default router ; 