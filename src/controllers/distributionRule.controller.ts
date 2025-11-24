import { Request, Response } from 'express';
import * as ruleService from '../services/distributionRule.service.js';

export const createRule = async (req: Request, res: Response) => {
  try {
    const { name, type, config, isActive } = req.body;

    if (!name || !type || !config) {
      return res.status(400).json({ error: 'Name, type, and config are required.' });
    }

    if (!['DATE_RANGE', 'LOCATION', 'DEVICE'].includes(type)) {
      return res.status(400).json({ error: 'Invalid rule type. Must be DATE_RANGE, LOCATION, or DEVICE.' });
    }

    const rule = await ruleService.createRule({ name, type, config, isActive });
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: 'Error creating distribution rule.' });
  }
};

export const getRule = async (req: Request, res: Response) => {
  try {
    const rule = await ruleService.getRuleById(req.params.id);
    
    if (!rule) {
      return res.status(404).json({ error: 'Distribution rule not found.' });
    }

    res.status(200).json(rule);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving distribution rule.' });
  }
};

export const getAllRules = async (req: Request, res: Response) => {
  try {
    const rules = await ruleService.getAllRules();
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving distribution rules.' });
  }
};

export const updateRule = async (req: Request, res: Response) => {
  try {
    const { name, type, config, isActive } = req.body;

    if (type && !['DATE_RANGE', 'LOCATION', 'DEVICE'].includes(type)) {
      return res.status(400).json({ error: 'Invalid rule type. Must be DATE_RANGE, LOCATION, or DEVICE.' });
    }

    const rule = await ruleService.updateRule(req.params.id, { name, type, config, isActive });
    
    if (!rule) {
      return res.status(404).json({ error: 'Distribution rule not found.' });
    }

    res.status(200).json(rule);
  } catch (error) {
    res.status(500).json({ error: 'Error updating distribution rule.' });
  }
};

export const deleteRule = async (req: Request, res: Response) => {
  try {
    const deleted = await ruleService.deleteRule(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Distribution rule not found.' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting distribution rule.' });
  }
};

