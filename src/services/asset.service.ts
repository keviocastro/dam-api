import { Asset } from '../generated/prisma/client.js';
import { IStorageService } from './storage/storage.interface';
import prisma from '../prisma/client.js';
import { assetCacheService } from './cache/assetCache.service.js';

export const createAsset = async (
  file: Express.Multer.File,
  data: { redirectUrl?: string; ruleId?: string },
  storageService: IStorageService
): Promise<Asset> => {
  const { storagePath, publicUrl } = await storageService.upload(file);

  const asset = await prisma.asset.create({
    data: {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      storagePath,
      publicUrl,
      redirectUrl: data.redirectUrl,
      ruleId: data.ruleId,
    },
  });

  await assetCacheService.invalidateCache();

  return asset;
};

export const getAssetById = async (id: string): Promise<Asset | null> => {
  return prisma.asset.findUnique({
    where: { id },
    include: { rule: true }
  });
};

export const getActiveAssets = async (
  location?: string,
  device?: string
): Promise<Asset[]> => {
  return assetCacheService.getActiveAssets(location, device);
};

export const trackClick = async (
  assetId: string,
  data: { userId: string; metadata?: any }
): Promise<Asset | null> => {
  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset) {
    return null;
  }

  await prisma.click.create({
    data: {
      assetId,
      userId: data.userId,
      metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
    },
  });

  return asset;
};

export const getAssetStats = async (assetId: string) => {
  const clicks = await prisma.click.count({ where: { assetId } });
  return { clicks };
};

export const updateAsset = async (
  id: string,
  data: { redirectUrl?: string; ruleId?: string },
  file?: Express.Multer.File,
  storageService?: IStorageService
): Promise<Asset | null> => {
  const asset = await prisma.asset.findUnique({ where: { id } });

  if (!asset) {
    return null;
  }

  let storagePath = asset.storagePath;
  let publicUrl = asset.publicUrl;

  if (file && storageService) {
    await storageService.delete(asset.storagePath);
    const uploadResult = await storageService.upload(file);
    storagePath = uploadResult.storagePath;
    publicUrl = uploadResult.publicUrl;
  }

  const updatedAsset = await prisma.asset.update({
    where: { id },
    data: {
      ...(file && { storagePath, publicUrl }),
      ...(data.redirectUrl !== undefined && { redirectUrl: data.redirectUrl }),
      ...(data.ruleId !== undefined && { ruleId: data.ruleId }),
    },
  });

  await assetCacheService.invalidateCache();

  return updatedAsset;
};

export const deleteAsset = async (
  id: string,
  storageService: IStorageService
): Promise<boolean> => {
  const asset = await prisma.asset.findUnique({ where: { id } });

  if (!asset) {
    return false;
  }

  await storageService.delete(asset.storagePath);
  await prisma.asset.delete({ where: { id } });

  await assetCacheService.invalidateCache();

  return true;
};
