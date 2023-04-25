export function getFileSizeFormat(value: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  const unit = units[unitIndex];
  const roundedValue = Math.round(value * 100) / 100;
  return `${roundedValue} ${unit}`;
}
