/**
 * Date utility helpers for Meringo property maintenance scheduling
 */

// Calculate next due date given a completion date (or base date) and task frequency
export function calculateNextDueDate(baseDateStr, frequency, intervalMonths = 1) {
  const date = baseDateStr ? new Date(baseDateStr) : new Date();

  switch (frequency) {
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + (intervalMonths || 1));
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'biannual':
      date.setMonth(date.getMonth() + 6);
      break;
    case 'annual':
      date.setFullYear(date.getFullYear() + 1);
      break;
    case 'seasonal':
      date.setMonth(date.getMonth() + (intervalMonths || 3));
      break;
    default:
      date.setMonth(date.getMonth() + (intervalMonths || 1));
      break;
  }

  return date.toISOString().split('T')[0];
}

// Calculate days difference between today and target date
export function getDaysDiff(targetDateStr) {
  if (!targetDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Get task urgency status: 'overdue' | 'today' | 'due-soon' (within 7 days) | 'due-month' (within 30 days) | 'future'
export function getTaskUrgency(dueDateStr) {
  const diff = getDaysDiff(dueDateStr);
  if (diff < 0) return 'overdue';
  if (diff === 0) return 'today';
  if (diff <= 7) return 'due-soon';
  if (diff <= 30) return 'due-month';
  return 'future';
}

// Format relative date friendly string
export function formatFriendlyDate(dateStr) {
  if (!dateStr) return 'No date set';
  const diff = getDaysDiff(dateStr);

  if (diff < -1) return `${Math.abs(diff)} days overdue`;
  if (diff === -1) return 'Yesterday';
  if (diff === 0) return 'Due today';
  if (diff === 1) return 'Due tomorrow';
  if (diff > 1 && diff <= 14) return `Due in ${diff} days`;

  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Format readable date standard
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Determine current Australian season
export function getCurrentSeason() {
  const month = new Date().getMonth(); // 0-11
  // Dec (11), Jan (0), Feb (1) = Summer
  if (month === 11 || month <= 1) return 'Summer';
  // Mar (2), Apr (3), May (4) = Autumn
  if (month >= 2 && month <= 4) return 'Autumn';
  // Jun (5), Jul (6), Aug (7) = Winter
  if (month >= 5 && month <= 7) return 'Winter';
  // Sep (8), Oct (9), Nov (10) = Spring
  return 'Spring';
}
