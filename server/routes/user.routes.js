import expres from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, getUserByToken, login, updateUser } from '../controllers/user.controller.js';

const router = expres.Router();

router.post('/', createUser);

// router.post('/login', login);

router.get('/getUsers', getAllUsers)

router.get('/:id', getUserById)

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/login', login);

router.get('/getUserByToken', getUserByToken);

export default router;