// Simple in-memory cache implementation
const cache = new Map();

// Cache entry structure: { data, expiry }
const getFromCache = (key) => {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  // Check if cache entry has expired
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  console.log(`Cache hit for key: ${key}`);
  return entry.data;
};

const setCache = (key, data, ttlMs = 300000) => {
  // Default 5 minutes TTL
  const expiry = Date.now() + ttlMs;
  cache.set(key, { data, expiry });
  console.log(`Cache set for key: ${key}, expires in ${ttlMs / 1000}s`);
};

const deleteFromCache = (key) => {
  const deleted = cache.delete(key);
  if (deleted) {
    console.log(`Cache deleted for key: ${key}`);
  }
  return deleted;
};

const clearCache = () => {
  const size = cache.size;
  cache.clear();
  console.log(`Cache cleared, removed ${size} entries`);
};

const getCacheStats = () => {
  const now = Date.now();
  let activeEntries = 0;
  let expiredEntries = 0;

  cache.forEach((entry, key) => {
    if (now > entry.expiry) {
      expiredEntries++;
    } else {
      activeEntries++;
    }
  });

  return {
    total: cache.size,
    active: activeEntries,
    expired: expiredEntries,
  };
};

// Clean up expired entries periodically
const cleanupExpired = () => {
  const now = Date.now();
  let cleaned = 0;

  cache.forEach((entry, key) => {
    if (now > entry.expiry) {
      cache.delete(key);
      cleaned++;
    }
  });

  if (cleaned > 0) {
    console.log(`Cleaned up ${cleaned} expired cache entries`);
  }

  return cleaned;
};

// Run cleanup every 10 minutes
setInterval(cleanupExpired, 600000);

export {
  getFromCache,
  setCache,
  deleteFromCache,
  clearCache,
  getCacheStats,
  cleanupExpired,
};
