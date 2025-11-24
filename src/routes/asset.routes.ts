import { Router } from 'express';
import multer from 'multer';
import * as assetController from '../controllers/asset.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), assetController.uploadAsset);
router.get('/:id', assetController.getAsset);
router.post('/:id/track', assetController.trackAssetClick);
router.get('/:id/stats', assetController.getAssetStatistics);

export default router;
