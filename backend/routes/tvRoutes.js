import express from 'express';
import { getSimilarTvs, getTrendingTv, getTvByCategory, getTvDetails, getTvTrailers } from '../controllers/tvControllers.js';
const router = express.Router();

router.get('/trendings' , getTrendingTv);
router.get('/:id/trailers', getTvTrailers);
router.get('/:id/details', getTvDetails);
router.get('/:id/similar' , getSimilarTvs);
router.get('/:category' , getTvByCategory);


export default router;