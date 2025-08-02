import { PAGE_TITLE } from './constants';

export function setPageTitle(to) {
  if (to?.meta?.title) {
    document.title = `${PAGE_TITLE} - ${to.meta.title}`;
    return;
  }

  document.title = PAGE_TITLE;
}
