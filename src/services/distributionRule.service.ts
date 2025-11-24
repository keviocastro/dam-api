import { DistributionRule } from '../generated/prisma/client.js';
import prisma from '../prisma/client.js';
import { assetCacheService } from './cache/assetCache.service.js';

export interface CreateRuleData {
  name: string;
  type: 'DATE_RANGE' | 'LOCATION' | 'DEVICE';
  config: any;
  isActive?: boolean;
}

export interface UpdateRuleData {
  name?: string;
  type?: 'DATE_RANGE' | 'LOCATION' | 'DEVICE';
  config?: any;
  isActive?: boolean;
}

export const createRule = async (data: CreateRuleData): Promise<DistributionRule> => {
  const rule = await prisma.distributionRule.create({
    data: {
      name: data.name,
      type: data.type,
      config: JSON.stringify(data.config),
      isActive: data.isActive ?? true,
    },
  });

  await assetCacheService.invalidateCache();

  return rule;
};

export const getRuleById = async (id: string): Promise<DistributionRule | null> => {
  return prisma.distributionRule.findUnique({ 
    where: { id },
    include: { assets: true }
  });
};

export const getAllRules = async (): Promise<DistributionRule[]> => {
  return prisma.distributionRule.findMany({
    include: { assets: true },
    orderBy: { createdAt: 'desc' }
  });
};

export const updateRule = async (
  id: string,
  data: UpdateRuleData
): Promise<DistributionRule | null> => {
  const rule = await prisma.distributionRule.findUnique({ where: { id } });

  if (!rule) {
    return null;
  }

  const updatedRule = await prisma.distributionRule.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.type && { type: data.type }),
      ...(data.config && { config: JSON.stringify(data.config) }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });

  await assetCacheService.invalidateCache();

  return updatedRule;
};

export const deleteRule = async (id: string): Promise<boolean> => {
  const rule = await prisma.distributionRule.findUnique({ where: { id } });

  if (!rule) {
    return false;
  }

  await prisma.distributionRule.delete({ where: { id } });

  await assetCacheService.invalidateCache();

  return true;
};

