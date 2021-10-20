import { Router } from 'express';
const router = Router();
import ApiController from '../controllers/ApiController'

router.post('/flicker', ApiController.getPhotos)

export default router;