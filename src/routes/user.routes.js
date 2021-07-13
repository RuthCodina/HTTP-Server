import {Router} from 'express';
import { createUserSongs, getUserSongs, getUserSongById, updateUserSongById, deleteUserSongById, getLikedUserSongs } from '../controllers/user'; 
import { verifyToken, isOwner } from '../middlewares/authWebToken';
import passport from 'passport';
const router = Router()



router.post('/', [verifyToken], createUserSongs)
router.get('/', [verifyToken, isOwner], getUserSongs)
router.get('/:username',[verifyToken, isOwner], getLikedUserSongs)
router.get('/:id', [verifyToken, isOwner], getUserSongById)
router.put('/:id', [verifyToken], updateUserSongById)
router.delete('/:id', [verifyToken, isOwner], deleteUserSongById)


export default router