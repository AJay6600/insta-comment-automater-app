import { Router } from 'express';
import updateAccount from '../controllers/account/updateAccount';
import deleteAccount from '../controllers/account/deleteAccount';
import addAccount from '../controllers/account/addAccount';
import getAllAccounts from '../controllers/account/getAllAccounts';

const router = Router();

/** get all accounts */
router.get('/', getAllAccounts);

/** Add new account */
router.post('/addAccount', addAccount);

/** update account */
router.put('/:id', updateAccount);

/** delete account */
router.delete('/:id', deleteAccount);

export default router;
