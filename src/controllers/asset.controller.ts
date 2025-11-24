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
