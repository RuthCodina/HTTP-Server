import {Router} from 'express';
import { singUp, login } from '../controllers/authentication';
import { checkEmailAndPassword, checkLogin, } from '../middlewares/verifysignup';
import '../middlewares/authSession';



const router = Router()


router.post('/signup', checkEmailAndPassword, singUp)
router.post('/login', checkLogin, login )

export default router;