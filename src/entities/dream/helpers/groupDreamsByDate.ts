import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';

export type GroupedDreams = {
  title: string;
  data: GetDreamDto[];
};

const TODAY_LABELS: Record<string, string> = {
  en: 'Today',
  ru: 'Сегодня',
  tr: 'Bugün',
  cs: 'Dnes',
  de: 'Heute',
  es: 'Hoy',
  fr: 'Aujourd’hui',
  it: 'Oggi',
  nl: 'Vandaag',
  pl: 'Dziś',
  sv: 'Idag',
  no: 'I dag',
  ja: '今日',
  zh: '今天',
  pt: 'Hoje',
  ar: 'اليوم',
  ko: '오늘',
  hi: 'आज',
};
const YESTERDAY_LABELS: Record<string, string> = {
  en: 'Yesterday',
  ru: 'Вчера',
  tr: 'Dün',
  cs: 'Včera',
  de: 'Gestern',
  es: 'Ayer',
  fr: 'Hier',
  it: 'Ieri',
  nl: 'Gisteren',
  pl: 'Wczoraj',
  sv: 'Igår',
  no: 'I går',
  ja: '昨日',
  zh: '昨天',
  pt: 'Ontem',
  ar: 'أمس',
  ko: '어제',
  hi: 'कल',
};

/**
 * Группирует записи по дате, возвращая заголовки "Today", "Yesterday" или форматированные даты.
 */
export function groupDreamsByDate(dreams: GetDreamDto[], locale = 'ru'): GroupedDreams[] {
  const map = new Map<string, GetDreamDto[]>();
  const now = new Date();
  const todayKey = TODAY_LABELS[locale] || TODAY_LABELS.en;
  const yesterdayKey = YESTERDAY_LABELS[locale] || YESTERDAY_LABELS.en;

  // Функция форматирования произвольной даты
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  for (const dream of dreams) {
    const dt = new Date(dream.createdAt);
    let title: string;
    const diff = Math.floor(
      (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
        new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (diff === 0) {
      title = todayKey;
    } else if (diff === 1) {
      title = yesterdayKey;
    } else {
      // приводит к "monday, 17 april"
      title = dateFormatter.format(dt);
      // капитализируем первую букву
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }

    if (!map.has(title)) {
      map.set(title, []);
    }
    map.get(title)!.push(dream);
  }

  // Сортировка групп по дате: сегодня → вчера → более старые
  const groups = Array.from(map.entries());
  groups.sort(([aKey, aList], [bKey, bList]) => {
    const parseKey = (key: string, firstDate: string) => {
      if (key === todayKey) return now;
      if (key === yesterdayKey) return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      return new Date(firstDate);
    };
    const dateA = parseKey(aKey, aList[0].createdAt.toISOString());
    const dateB = parseKey(bKey, bList[0].createdAt.toISOString());
    return dateB.getTime() - dateA.getTime();
  });

  return groups.map(([title, data]) => ({ title, data }));
}
