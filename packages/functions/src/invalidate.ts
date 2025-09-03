import { getContext } from './get-context';

interface InvalidateOptions {
  /**
   * The strategy to use for the invalidate, if none is provided, the default strategy is stale-while-revalidate.
   * @default 'stale-while-revalidate'
   * stale-while-revalidate: will return the stale data while revalidating the new data in the background
   * stale-if-error: will return the stale data if the revalidation fails
   * dangerously-expire: will expire the data immediately
   */
  strategy?: 'stale-while-revalidate' | 'stale-if-error' | 'dangerously-expire';
  /**
   * For strategies 'stale-while-revalidate' and 'stale-if-error', this is the TTL in seconds after which the data will be expire. If none is provided, the default is 1 year,
   */
  dangerouslyExpireAfter?: number;
}

/**
 * Vercel Cache Invalidation APIs.
 */
export interface InvalidateApi {
  /**
   * Invalidate a tag or tags.
   *
   * @param tag The tag or tags to invalidate.
   * @param options The options for the invalidate that specify the invalidation strategy.
   * @returns A promise that resolves when the invalidate is complete.
   */
  invalidateTag: (
    tag: string | string[],
    options?: InvalidateOptions
  ) => Promise<void>;

  /**
   * Invalidate a src image or images.
   *
   * @param src The src image or images to invalidate.
   * @param options The options for the invalidate that specify the invalidation strategy.
   * @returns A promise that resolves when the invalidate is complete.
   */
  invalidateSrcImage: (
    src: string | string[],
    options?: InvalidateOptions
  ) => Promise<void>;
}
export const invalidateTag = (
  tag: string | string[],
  options?: InvalidateOptions
) => {
  const api = getContext().invalidate;
  if (api) {
    return api.invalidateTag(tag, options);
  }
  return Promise.resolve();
};

export const invalidateSrcImage = (
  src: string | string[],
  options?: InvalidateOptions
) => {
  const api = getContext().invalidate;
  if (api) {
    return api.invalidateSrcImage(src, options);
  }
  return Promise.resolve();
};
