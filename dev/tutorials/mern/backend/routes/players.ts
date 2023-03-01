import express from 'express';
import { createPlayer, deletePlayerByEmail, updatePlayerByEmail, readPlayers, readPlayerByEmail } from '../controllers/players';

const router = express.Router();

// POST a new player
router.post('/', createPlayer);

// GET all players
router.get('/', readPlayers);

// GET one player
router.get('/:email', readPlayerByEmail);

// UPDATE a player
router.patch('/:email', updatePlayerByEmail);

// DELETE a player
router.delete('/:email', deletePlayerByEmail);

export default router;
