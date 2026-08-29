import { Activity, ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { Card, SectionHeader, TrendIndicator } from '@/components/ui';
import { StackedTrend } from '@/components/charts';
import { progressCategories, progressTrendData } from '@/data';
import type { ProgressCategory } from '@/types';

const catConfig: Record<ProgressCategory['key'], { color: string; bg: string; text: string; icon: React.ReactNode }> = {
  improving: { color: '#12b85f', bg: 'bg-success-50', text: 'text-success-700', icon: <ArrowUpRight className="h-4 w-4" /> },
  stable: { color: '#3471f5', bg: 'bg-brand-50', text: 'text-brand-700', icon: <Minus className="h-4 w-4" /> },
  declining: { color: '#f5840a', bg: 'bg-warning-50', text: 'text-warning-700', icon: <ArrowDownRight className="h-4 w-4" /> },
  'needs-support': { color: '#e44848', bg: 'bg-danger-50', text: 'text-danger-700', icon: <ArrowDownRight className="h-4 w-4" /> },
};

export function ProgressTrends() {
  return (
    <section>
      <SectionHeader
        title="Student Progress Trends"
        subtitle="Performance trajectory across recent examinations"
        icon={<Activity className="h-4.5 w-4.5" />}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Category cards */}
        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          {progressCategories.map((c) => {
            const cfg = catConfig[c.key];
            return (
              <Card key={c.key} hover className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${cfg.bg} ${cfg.text}`}>{cfg.icon}</div>
                  <TrendIndicator trend={c.trend} />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold text-ink-900">{c.pct}%</div>
                  <div className="text-xs font-bold text-ink-700">{c.label}</div>
                  <div className="text-[11px] font-medium text-ink-400">{c.count} students</div>
                </div>
                {/* mini bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-ink-100">
                  <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, backgroundColor: cfg.color }} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trend chart */}
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-ink-900">Trend Over Exams</span>
            <div className="flex items-center gap-2">
              {progressCategories.map((c) => (
                <span key={c.key} className="flex items-center gap-1 text-[10px] font-semibold text-ink-500">
                  <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: catConfig[c.key].color }} />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
          <StackedTrend data={progressTrendData} height={200} />
          <div className="mt-1 flex justify-between px-1 text-[10px] font-semibold text-ink-400">
            {progressTrendData.map((d) => (
              <span key={d.exam}>{d.exam}</span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
