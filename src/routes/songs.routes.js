import {Router} from 'express';
import { getSongs, getSongById, updateLike } from '../controllers/songs';
import { verifyToken} from '../middlewares/authWebToken';

const router = Router()

router.get('/', getSongs)
router.get('/:id', getSongById)
router.put('/:id', verifyToken, updateLike)


export default router;