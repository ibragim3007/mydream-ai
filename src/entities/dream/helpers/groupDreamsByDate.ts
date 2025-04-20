import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';

type GroupedDreams = {
  title: string; // дата, например "2025-04-17"
  data: GetDreamDto[];
};

export function groupDreamsByDate(dreams: GetDreamDto[]): GroupedDreams[] {
  const map = new Map<string, GetDreamDto[]>();

  for (const dream of dreams) {
    const date = new Date(dream.createdAt).toDateString(); // или toLocaleDateString
    if (!map.has(date)) {
      map.set(date, []);
    }
    map.get(date)!.push(dream);
  }

  return Array.from(map.entries()).map(([title, data]) => ({
    title,
    data,
  }));
}
