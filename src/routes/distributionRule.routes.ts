import { Router } from 'express';
import * as ruleController from '../controllers/distributionRule.controller.js';

const router = Router();

/**
 * @openapi
 * /distribution-rules:
 *   post:
 *     summary: Create a new distribution rule
 *     tags: [Distribution Rules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - config
 *             properties:
 *               name:
 *                 type: string
 *                 description: Rule name
 *               type:
 *                 type: string
 *                 enum: [DATE_RANGE, LOCATION, DEVICE]
 *                 description: Rule type
 *               config:
 *                 type: object
 *                 description: Rule configuration (varies by type)
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the rule is active
 *     responses:
 *       201:
 *         description: Distribution rule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DistributionRule'
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
router.post('/', ruleController.createRule);

/**
 * @openapi
 * /distribution-rules:
 *   get:
 *     summary: Get all distribution rules
 *     tags: [Distribution Rules]
 *     responses:
 *       200:
 *         description: List of distribution rules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DistributionRule'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', ruleController.getAllRules);

/**
 * @openapi
 * /distribution-rules/{id}:
 *   get:
 *     summary: Get distribution rule by ID
 *     tags: [Distribution Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Distribution rule ID
 *     responses:
 *       200:
 *         description: Distribution rule found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DistributionRule'
 *       404:
 *         description: Distribution rule not found
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
router.get('/:id', ruleController.getRule);

/**
 * @openapi
 * /distribution-rules/{id}:
 *   put:
 *     summary: Update distribution rule
 *     tags: [Distribution Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Distribution rule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Rule name
 *               type:
 *                 type: string
 *                 enum: [DATE_RANGE, LOCATION, DEVICE]
 *                 description: Rule type
 *               config:
 *                 type: object
 *                 description: Rule configuration
 *               isActive:
 *                 type: boolean
 *                 description: Whether the rule is active
 *     responses:
 *       200:
 *         description: Distribution rule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DistributionRule'
 *       404:
 *         description: Distribution rule not found
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
router.put('/:id', ruleController.updateRule);

/**
 * @openapi
 * /distribution-rules/{id}:
 *   delete:
 *     summary: Delete distribution rule
 *     tags: [Distribution Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Distribution rule ID
 *     responses:
 *       204:
 *         description: Distribution rule deleted successfully
 *       404:
 *         description: Distribution rule not found
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
router.delete('/:id', ruleController.deleteRule);

export default router;

