import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import moment from 'moment';

export type GroupedDreams = {
  title: string; // дата, например "2025-04-17"
  data: GetDreamDto[];
};

const TODAY_LABELS: Record<string, string> = {
  ru: 'Сегодня',
  en: 'Today',
  de: 'Heute',
  fr: 'Aujourd’hui',
};

const YESTERDAY_LABELS: Record<string, string> = {
  ru: 'Вчера',
  en: 'Yesterday',
  de: 'Gestern',
  fr: 'Hier',
};

export function groupDreamsByDate(dreams: GetDreamDto[], locale = 'ru'): GroupedDreams[] {
  try {
    moment.locale(locale);
    const map = new Map<string, GetDreamDto[]>();

    for (const dream of dreams) {
      const date = moment(dream.createdAt);

      let title: string;

      if (date.isSame(moment(), 'day')) {
        title = TODAY_LABELS[locale] || TODAY_LABELS['en'];
      } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {
        title = YESTERDAY_LABELS[locale] || YESTERDAY_LABELS['en'];
      } else {
        title = date.format('dddd, D MMMM');
      }

      // Заглавная первая буква
      title = title.charAt(0).toUpperCase() + title.slice(1);

      if (!map.has(title)) {
        map.set(title, []);
      }
      map.get(title)!.push(dream);
    }

    const sortedGroups = Array.from(map.entries()).sort((a, b) => {
      const getMoment = (label: string, firstDream: GetDreamDto) => {
        const normalized = label.toLowerCase();
        if (normalized === (TODAY_LABELS[locale] || 'today').toLowerCase()) return moment();
        if (normalized === (YESTERDAY_LABELS[locale] || 'yesterday').toLowerCase()) return moment().subtract(1, 'day');
        return moment(firstDream.createdAt);
      };

      const dateA = getMoment(a[0], a[1][0]);
      const dateB = getMoment(b[0], b[1][0]);
      return dateB.diff(dateA);
    });

    return sortedGroups.map(([title, data]) => ({ title, data }));
  } catch (error) {
    errorLogger.logError('Error to group dreams by date');
    return [];
  }
}
