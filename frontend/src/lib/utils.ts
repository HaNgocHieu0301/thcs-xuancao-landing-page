export function formatDate(date: string | Date) {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return dt.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateRange(start: string, end?: string | null) {
  const startDt = new Date(start);
  if (!end) {
    return formatDate(startDt);
  }
  const endDt = new Date(end);
  if (startDt.toDateString() === endDt.toDateString()) {
    return `${formatDate(startDt)} · ${startDt.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })} - ${endDt.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }
  return `${formatDate(startDt)} - ${formatDate(endDt)}`;
}
