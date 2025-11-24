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
 *                 example: Weekend Campaign
 *               type:
 *                 type: string
 *                 enum: [DATE_RANGE, LOCATION, DEVICE]
 *                 description: Rule type
 *                 example: DATE_RANGE
 *               config:
 *                 type: object
 *                 description: |
 *                   Rule configuration object (varies by type):
 *
 *                   **DATE_RANGE**: Defines a time period for the rule
 *                   - startDate (string, required): ISO 8601 date string for start
 *                   - endDate (string, required): ISO 8601 date string for end
 *
 *                   **LOCATION**: Defines geographic targeting
 *                   - countries (string[], optional): List of country names
 *                   - regions (string[], optional): List of region names
 *                   - cities (string[], optional): List of city names
 *
 *                   **DEVICE**: Defines device type targeting
 *                   - types (string[], optional): List of device types (e.g., mobile, desktop, tablet)
 *                 oneOf:
 *                   - type: object
 *                     description: DATE_RANGE configuration
 *                     properties:
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-01T00:00:00Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-31T23:59:59Z"
 *                     required:
 *                       - startDate
 *                       - endDate
 *                   - type: object
 *                     description: LOCATION configuration
 *                     properties:
 *                       countries:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Brazil", "Argentina"]
 *                       regions:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Southeast", "South"]
 *                       cities:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["São Paulo", "Rio de Janeiro"]
 *                   - type: object
 *                     description: DEVICE configuration
 *                     properties:
 *                       types:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["mobile", "tablet"]
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the rule is active
 *                 example: true
 *           examples:
 *             dateRange:
 *               summary: Date Range Rule
 *               value:
 *                 name: "Holiday Campaign"
 *                 type: "DATE_RANGE"
 *                 config:
 *                   startDate: "2024-12-01T00:00:00Z"
 *                   endDate: "2024-12-31T23:59:59Z"
 *                 isActive: true
 *             location:
 *               summary: Location Rule
 *               value:
 *                 name: "Brazil Campaign"
 *                 type: "LOCATION"
 *                 config:
 *                   countries: ["Brazil"]
 *                   cities: ["São Paulo", "Rio de Janeiro"]
 *                 isActive: true
 *             device:
 *               summary: Device Rule
 *               value:
 *                 name: "Mobile Only"
 *                 type: "DEVICE"
 *                 config:
 *                   types: ["mobile"]
 *                 isActive: true
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
 *                 example: Updated Campaign Name
 *               type:
 *                 type: string
 *                 enum: [DATE_RANGE, LOCATION, DEVICE]
 *                 description: Rule type
 *                 example: DATE_RANGE
 *               config:
 *                 type: object
 *                 description: |
 *                   Rule configuration object (varies by type):
 *
 *                   **DATE_RANGE**: Defines a time period for the rule
 *                   - startDate (string, required): ISO 8601 date string for start
 *                   - endDate (string, required): ISO 8601 date string for end
 *
 *                   **LOCATION**: Defines geographic targeting
 *                   - countries (string[], optional): List of country names
 *                   - regions (string[], optional): List of region names
 *                   - cities (string[], optional): List of city names
 *
 *                   **DEVICE**: Defines device type targeting
 *                   - types (string[], optional): List of device types (e.g., mobile, desktop, tablet)
 *                 oneOf:
 *                   - type: object
 *                     description: DATE_RANGE configuration
 *                     properties:
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-01T00:00:00Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-31T23:59:59Z"
 *                     required:
 *                       - startDate
 *                       - endDate
 *                   - type: object
 *                     description: LOCATION configuration
 *                     properties:
 *                       countries:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Brazil", "Argentina"]
 *                       regions:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Southeast", "South"]
 *                       cities:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["São Paulo", "Rio de Janeiro"]
 *                   - type: object
 *                     description: DEVICE configuration
 *                     properties:
 *                       types:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["mobile", "tablet"]
 *               isActive:
 *                 type: boolean
 *                 description: Whether the rule is active
 *                 example: true
 *           examples:
 *             dateRange:
 *               summary: Update Date Range Rule
 *               value:
 *                 name: "Extended Holiday Campaign"
 *                 type: "DATE_RANGE"
 *                 config:
 *                   startDate: "2024-12-01T00:00:00Z"
 *                   endDate: "2025-01-15T23:59:59Z"
 *                 isActive: true
 *             location:
 *               summary: Update Location Rule
 *               value:
 *                 name: "South America Campaign"
 *                 type: "LOCATION"
 *                 config:
 *                   countries: ["Brazil", "Argentina", "Chile"]
 *                 isActive: true
 *             device:
 *               summary: Update Device Rule
 *               value:
 *                 name: "Mobile and Tablet"
 *                 type: "DEVICE"
 *                 config:
 *                   types: ["mobile", "tablet"]
 *                 isActive: false
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

