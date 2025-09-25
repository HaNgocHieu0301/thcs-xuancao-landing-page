import Card from './Card';
import type { Event } from '@/lib/types';
import { formatDateRange } from '@/lib/utils';

type EventsListProps = {
  events: Event[];
};

export default function EventsList({ events }: EventsListProps) {
  if (!events?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        Hiện chưa có sự kiện sắp diễn ra.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Sự kiện</p>
          <h2 className="text-2xl font-bold text-slate-900">Kết nối cộng đồng Xuân Cao</h2>
        </div>
        <a className="text-sm font-semibold text-primary-600" href="/su-kien">
          Xem tất cả →
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card
            key={event.id}
            href={`/su-kien/${event.slug}`}
            title={event.title}
            description={event.description}
            media={event.coverImage}
            meta={formatDateRange(event.startDate, event.endDate)}
          />
        ))}
      </div>
    </div>
  );
}
