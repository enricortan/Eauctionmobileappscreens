export const C = {
  bg: '#F7F8FA',
  surface: '#FFFFFF',
  border: '#EAEDF2',
  borderStrong: '#D0D5DD',
  text: '#0D1117',
  textMid: '#5C6472',
  textSoft: '#9BA3AF',
  accent: '#7C3AED',
  accentSoft: '#F5F3FF',
  green: '#0C9E6A',
  greenSoft: '#EDFAF4',
  red: '#DC2626',
  redSoft: '#FEF2F2',
  amber: '#D97706',
  amberSoft: '#FFFBEB',
  purple: '#7C3AED',
  purpleSoft: '#F5F3FF',
};

export const avColors = [C.accent, C.green, C.amber, C.purple];
export const avBgs = [C.accentSoft, C.greenSoft, C.amberSoft, C.purpleSoft];
export const rankColors = [C.green, C.accent, C.amber];

export function fmt(n: number): string {
  if (!n && n !== 0) return '—';
  if (n >= 1000000) return `₱${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `₱${(n / 1000).toFixed(0)}K`;
  return `₱${n}`;
}

export function fmtFull(n: number): string {
  return '₱' + n.toLocaleString();
}

export function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}