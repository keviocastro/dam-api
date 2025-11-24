import { Request, Response } from 'express';
import * as assetService from '../services/asset.service';
import { GoogleCloudStorageService } from '../services/storage/gcs.service';

const storageService = new GoogleCloudStorageService();

export const uploadAsset = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const asset = await assetService.createAsset(req.file, req.body, storageService);
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
};

export const getAsset = async (req: Request, res: Response) => {
  try {
    const asset = await assetService.getAssetById(req.params.id);
    if (!asset) {
      return res.status(404).send('Asset not found or not available.');
    }
    res.redirect(asset.publicUrl);
  } catch (error) {
    res.status(500).send('Error retrieving asset.');
  }
};

export const getActiveAssets = async (req: Request, res: Response) => {
  try {
    const location = req.headers['x-location'] as string | undefined;
    const device = req.headers['x-device'] as string | undefined;

    const assets = await assetService.getActiveAssets(location, device);
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving active assets.' });
  }
};

export const trackAssetClick = async (req: Request, res: Response) => {
  try {
    const asset = await assetService.trackClick(req.params.id, req.body);
    if (!asset) {
      return res.status(404).send('Asset not found.');
    }
    if (asset.redirectUrl) {
      res.redirect(asset.redirectUrl);
    } else {
      res.status(200).send('Click tracked.');
    }
  } catch (error) {
    res.status(500).send('Error tracking click.');
  }
};

export const getAssetStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await assetService.getAssetStats(req.params.id);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).send('Error retrieving statistics.');
  }
};

export const updateAsset = async (req: Request, res: Response) => {
  try {
    const asset = await assetService.updateAsset(
      req.params.id,
      req.body,
      req.file,
      req.file ? storageService : undefined
    );

    if (!asset) {
      return res.status(404).send('Asset not found.');
    }

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).send('Error updating asset.');
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const deleted = await assetService.deleteAsset(req.params.id, storageService);

    if (!deleted) {
      return res.status(404).send('Asset not found.');
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting asset.');
  }
};
