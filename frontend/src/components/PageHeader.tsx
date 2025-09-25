import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbItem } from '@/lib/types';

interface PageHeaderProps {
  title: string;
  description?: string | null;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/80">
      <div className="container flex flex-col gap-6 py-12">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
            {description && <p className="text-base text-slate-600 sm:text-lg">{description}</p>}
          </div>
          {actions}
        </div>
      </div>
    </section>
  );
}
