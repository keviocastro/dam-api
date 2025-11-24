import { Asset } from '../../generated/prisma/client.js';
import prisma from '../../prisma/client.js';
import { validateRule } from '../ruleValidator.service.js';
import { ICacheService } from './cache.interface';
import { RedisCacheService } from './redis.cache.js';

const CACHE_PREFIX = 'active_assets';
const DEFAULT_TTL = 300;

export class AssetCacheService {
  private cacheService: ICacheService;

  constructor(cacheService?: ICacheService) {
    this.cacheService = cacheService || new RedisCacheService();
  }

  private getCacheKey(location?: string, device?: string): string {
    const loc = location?.toLowerCase().trim() || 'any';
    const dev = device?.toLowerCase().trim() || 'any';
    return `${CACHE_PREFIX}:${loc}:${dev}`;
  }

  async getActiveAssets(location?: string, device?: string): Promise<Asset[]> {
    const cacheKey = this.getCacheKey(location, device);
    const cached = await this.cacheService.get<Asset[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const assets = await this.computeActiveAssets(location, device);
    await this.cacheService.set(cacheKey, assets, DEFAULT_TTL);

    return assets;
  }

  private async computeActiveAssets(location?: string, device?: string): Promise<Asset[]> {
    const assets = await prisma.asset.findMany({
      include: { rule: true }
    });

    return assets.filter(asset => {
      if (!asset.rule) {
        return true;
      }

      return validateRule(asset.rule, { location, device });
    });
  }

  async invalidateCache(): Promise<void> {
    await this.cacheService.clear();
  }

  async invalidateCacheForContext(location?: string, device?: string): Promise<void> {
    const cacheKey = this.getCacheKey(location, device);
    await this.cacheService.delete(cacheKey);
  }
}

export const assetCacheService = new AssetCacheService();

