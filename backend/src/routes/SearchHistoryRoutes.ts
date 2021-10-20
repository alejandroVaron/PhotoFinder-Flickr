import { Router } from 'express';
const router = Router();
import SearchHistoryController from '../controllers/SearchHistoryController'

router.get('/', SearchHistoryController.getAllSearchHistory)
router.post('/', SearchHistoryController.addSearchHistory)
router.put('/id=:id', SearchHistoryController.updateSearchHistoryById)
router.delete('/id=:id', SearchHistoryController.deleteSearchHistoryById)
router.get('/id=:id', SearchHistoryController.getSearchHistoryById)

export default router;