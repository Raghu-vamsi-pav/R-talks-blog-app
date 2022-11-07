import express from 'express';
import {getAllUsers, signUp, login, googleLogin} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/login-google', googleLogin);
export default router;