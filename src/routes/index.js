import { Router } from 'express';
import songRoutes from './songs.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';



const router = Router();

router.use('/songs', songRoutes );
router.use('/user', userRoutes);
router.use('/auth', authRoutes);




module.exports = router;