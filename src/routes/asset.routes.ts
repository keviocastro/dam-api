import { Router } from 'express';
import multer from 'multer';
import * as assetController from '../controllers/asset.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /assets:
 *   post:
 *     summary: Upload a new asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *               redirectUrl:
 *                 type: string
 *                 description: Optional redirect URL
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Asset availability start date
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Asset availability end date
 *     responses:
 *       201:
 *         description: Asset uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', upload.single('file'), assetController.uploadAsset);

/**
 * @openapi
 * /assets/{id}:
 *   get:
 *     summary: Get asset by ID
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Asset found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       404:
 *         description: Asset not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', assetController.getAsset);

/**
 * @openapi
 * /assets/{id}/track:
 *   post:
 *     summary: Track asset click
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID who clicked
 *               metadata:
 *                 type: string
 *                 description: Optional metadata
 *     responses:
 *       201:
 *         description: Click tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Click'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Asset not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/track', assetController.trackAssetClick);

/**
 * @openapi
 * /assets/{id}/stats:
 *   get:
 *     summary: Get asset statistics
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Asset statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 assetId:
 *                   type: string
 *                 totalClicks:
 *                   type: integer
 *                 uniqueUsers:
 *                   type: integer
 *       404:
 *         description: Asset not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/stats', assetController.getAssetStatistics);

export default router;
