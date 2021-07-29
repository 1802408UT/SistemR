import { Router } from 'express';
import ItemsController from '../controller/ItemController';

const router = Router();

// Get all users
router.get('/', ItemsController.getAll);

// Get one user
router.get('/:id', ItemsController.getById);

// Create a new user
router.post('/',  ItemsController.newItem);

// Edit user
router.patch('/:id',  ItemsController.editItem);

// Delete
router.delete('/:id',  ItemsController.deleteItem);

export default router;