import { MAX_HORSE_CONDITION, MIN_HORSE_CONDITION, PAGE_TITLE } from './constants';

export function setPageTitle(to) {
  if (to?.meta?.title) {
    document.title = `${PAGE_TITLE} - ${to.meta.title}`;
    return;
  }

  document.title = PAGE_TITLE;
}

export function secondsToHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = num => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getRandomCondition() {
  return Math.floor(Math.random() * (MAX_HORSE_CONDITION - MIN_HORSE_CONDITION + 1)) + MIN_HORSE_CONDITION;
}
