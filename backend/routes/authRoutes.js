import express from 'express';
import { authCheck, login, logout, signup } from '../controllers/authControllers.js';
import { protectedRoute } from '../middleware/protectedRoutes.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get("/authCheck", protectedRoute, authCheck);
export default router;