import express from 'express';
import { createUser, deleteUserByEmail, updateUserByEmail, readUsers, readUserByEmail, readCurrentUser } from '../controllers/users';
import { isAuthenticated, isAdmin } from '../controllers/auth';
const router = express.Router();

// DELETE a player
router.delete('/:email', deleteUserByEmail);

// GET current user
router.get('/current', isAuthenticated, readCurrentUser);

// GET all players
router.get('/', readUsers);

// GET one player
router.get('/:email', readUserByEmail);

// UPDATE a player
router.patch('/:email', updateUserByEmail);

// POST a new player
router.post('/', createUser);

export default router;
