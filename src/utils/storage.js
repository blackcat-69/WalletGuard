const STORAGE_KEY = 'walletguard_budget';

export function getStorageKey() {
  return STORAGE_KEY;
}

export function loadBudget() {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveBudget(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export function clearBudget() {
  localStorage.removeItem(STORAGE_KEY);
}

export function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function daysFromTodayInclusive(yyyymmdd) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${yyyymmdd}T00:00:00`);
  const ms = target.getTime() - today.getTime();
  const days = Math.round(ms / (1000 * 60 * 60 * 24));
  return days;
}

export function dailyLimit(currentBalance, yyyymmdd) {
  const days = daysFromTodayInclusive(yyyymmdd);
  if (!isFinite(days) || days <= 0) return null;
  return currentBalance / days;
}

export function formatDateDDMMYYYY(yyyymmdd) {
  if (!yyyymmdd || !/^\d{4}-\d{2}-\d{2}$/.test(yyyymmdd)) return '';
  const [, y, m, d] = yyyymmdd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return `${d}-${m}-${y}`;
}

export function formatMoney(value) {
  if (value == null || !isFinite(value)) return '—';
  return `RM ${value.toFixed(2)}`;
}
