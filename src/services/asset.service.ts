import { Asset } from '@prisma/client';
import { IStorageService } from './storage/storage.interface';
import prisma from '../prisma/client';

export const createAsset = async (
  file: Express.Multer.File,
  data: { redirectUrl?: string; startDate?: string; endDate?: string },
  storageService: IStorageService
): Promise<Asset> => {
  const { storagePath, publicUrl } = await storageService.upload(file);

  return prisma.asset.create({
    data: {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      storagePath,
      publicUrl,
      redirectUrl: data.redirectUrl,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
  });
};

export const getAssetById = async (id: string): Promise<Asset | null> => {
  const asset = await prisma.asset.findUnique({ where: { id } });

  if (!asset) {
    return null;
  }

  const now = new Date();
  if (asset.startDate && asset.startDate > now) {
    return null;
  }
  if (asset.endDate && asset.endDate < now) {
    return null;
  }

  return asset;
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
