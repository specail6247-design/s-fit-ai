import { supabase } from '@/lib/supabaseClient';
import { createHash } from 'crypto';

interface TryOnCacheEntry {
  imageUrl: string;
  createdAt: number;
}

export class TryOnCacheService {
  private memoryCache: Map<string, TryOnCacheEntry>;
  // TTL for memory cache: 24 hours
  private readonly TTL_MS = 1000 * 60 * 60 * 24;
  // Max items in memory cache to prevent memory leaks
  private readonly MAX_CACHE_SIZE = 100;

  constructor() {
    this.memoryCache = new Map();
  }

  /**
   * Generates a deterministic cache key from inputs.
   */
  generateKey(userPhoto: string, garmentImage: string, category: string): string {
    const hash = createHash('sha256');
    hash.update(userPhoto);
    hash.update(garmentImage);
    hash.update(category);
    return hash.digest('hex');
  }

  /**
   * Retrieves an image URL from cache (Memory -> Supabase).
   */
  async get(key: string): Promise<string | null> {
    // 1. Check Memory Cache
    const entry = this.memoryCache.get(key);
    if (entry) {
      if (Date.now() - entry.createdAt < this.TTL_MS) {
        console.log(`[Cache] Hit (Memory): ${key.substring(0, 8)}...`);
        return entry.imageUrl;
      } else {
        console.log(`[Cache] Expired (Memory): ${key.substring(0, 8)}...`);
        this.memoryCache.delete(key);
      }
    }

    // 2. Check Supabase (L2 Cache)
    try {
      // We check if supabase is configured properly before calling it to avoid noise
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

      const { data, error } = await supabase
        .from('try_on_cache')
        .select('image_url, created_at')
        .eq('id', key)
        .single();

      if (error) {
        // Expected if table doesn't exist or row not found
        return null;
      }

      if (data) {
        console.log(`[Cache] Hit (Supabase): ${key.substring(0, 8)}...`);

        // Populate memory cache (L1)
        this.memoryCache.set(key, {
            imageUrl: data.image_url,
            createdAt: Date.now()
        });

        return data.image_url;
      }
    } catch (_e) {
      // Supabase interaction failed, just ignore
      // console.warn('Supabase cache lookup error:', e);
    }

    console.log(`[Cache] Miss: ${key.substring(0, 8)}...`);
    return null;
  }

  /**
   * Saves an image URL to cache (Memory -> Supabase).
   */
  async set(key: string, imageUrl: string): Promise<void> {
    // 1. Update Memory Cache
    if (this.memoryCache.size >= this.MAX_CACHE_SIZE) {
      // Simple FIFO eviction: delete the first inserted key (Map preserves insertion order)
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) this.memoryCache.delete(firstKey);
    }

    this.memoryCache.set(key, {
      imageUrl,
      createdAt: Date.now()
    });

    // 2. Update Supabase
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

        const { error } = await supabase
            .from('try_on_cache')
            .upsert({
                id: key,
                image_url: imageUrl,
                created_at: new Date().toISOString()
            });

        if (error) {
           // console.warn('Failed to update Supabase cache:', error.message);
        }
    } catch (_e) {
        // console.warn('Unexpected error updating Supabase cache:', e);
    }
  }
}

export const tryOnCache = new TryOnCacheService();
