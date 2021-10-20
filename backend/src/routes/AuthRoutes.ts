import { Router } from 'express';
const router = Router();
import AuthController from '../controllers/AuthController'

router.post('/signIn', AuthController.signIn)
router.post('/signUp', AuthController.signUp)

export default router;