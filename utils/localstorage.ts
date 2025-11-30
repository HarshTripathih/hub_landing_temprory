// src/utils/storage.ts
export const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();
  const item = { value, expiry: now.getTime() + ttl };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = <T = any>(key: string): T | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
