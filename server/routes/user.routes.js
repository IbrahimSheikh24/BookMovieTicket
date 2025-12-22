import expres from 'express';
import { createUser, getAllUsers } from '../controllers/user.controller.js';

const router = expres.Router();

router.post('/', createUser);

// router.post('/login', login);

router.get('/getUsers', getAllUsers)


export default router;