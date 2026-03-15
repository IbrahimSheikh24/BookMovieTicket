import expres from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, getUserByToken, login, updateUser } from '../controllers/user.controller.js';

const router = expres.Router();

router.post('/signup', createUser);

router.get('/getUsers', getAllUsers)

router.post('/login', login);

router.get('/getUserByToken', getUserByToken);

router.get('/:id', getUserById)

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;