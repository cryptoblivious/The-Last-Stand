import express from 'express';
import { createPlayer, deletePlayerByEmail, updatePlayerByEmail, readPlayers, readPlayerByEmail } from '../controllers/players';

const router = express.Router();

// DELETE a player
router.delete('/:email', deletePlayerByEmail);

// GET all players
router.get('/', readPlayers);

// GET one player
router.get('/:email', readPlayerByEmail);

// UPDATE a player
router.patch('/:email', updatePlayerByEmail);

// POST a new player
router.post('/', createPlayer);

export default router;
