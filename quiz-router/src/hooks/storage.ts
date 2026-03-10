export function saveJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadJSON<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}