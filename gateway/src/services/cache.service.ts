/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}

  async setToCache(key: string, data: any) {
    return await this.cacheManager.set(key, data, { ttl: 360000 });
  }

  async getFromCache(key: string) {
    return await this.cacheManager.get(key);
  }

  async clearCache() {
    const keys = await this.cacheManager.keys();
    return await this.cacheManager.del(keys);
  }
}
