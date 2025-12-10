import express from 'express';
import auth from '../middelware/auth.js';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();
router.use(auth);

router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;