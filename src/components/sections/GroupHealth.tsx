import { ChevronRight, HeartPulse } from 'lucide-react';
import { useState } from 'react';
import { Card, ProgressBar, SectionHeader, StatusBadge, TrendIndicator } from '@/components/ui';
import { groupHealth } from '@/data';
import type { GroupHealth } from '@/types';

export function GroupHealthOverview() {
  const [expanded, setExpanded] = useState<string | null>('CEC');

  return (
    <section>
      <SectionHeader
        title="Academic Health by Group"
        subtitle="Composite status across attendance, exams, failures, syllabus and trends"
        icon={<HeartPulse className="h-4.5 w-4.5" />}
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {groupHealth.map((g) => (
          <Card key={g.group} hover className="p-4">
            <div className="flex items-start justify-between">
              <span className="text-lg font-extrabold text-ink-900">{g.group}</span>
              <StatusBadge status={g.status} />
            </div>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Attendance', value: g.attendance, max: 100, color: g.attendance >= 95 ? 'success' : g.attendance >= 90 ? 'brand' : 'warning' },
                { label: 'Exam Avg', value: g.examAvg, max: 100, color: g.examAvg >= 78 ? 'success' : g.examAvg >= 72 ? 'brand' : 'warning' },
                { label: 'Syllabus', value: g.syllabus, max: 100, color: g.syllabus >= 70 ? 'success' : g.syllabus >= 60 ? 'brand' : 'warning' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="mb-0.5 flex items-center justify-between text-[10px] font-semibold text-ink-500">
                    <span>{m.label}</span>
                    <span className="text-ink-700">{m.value}%</span>
                  </div>
                  <ProgressBar value={m.value} color={m.color as 'success' | 'brand' | 'warning'} height="h-1.5" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{g.failed} failed</span>
              <TrendIndicator trend={g.trend} />
            </div>
            <button
              onClick={() => setExpanded(expanded === g.group ? null : g.group)}
              className="mt-2 flex w-full items-center justify-between rounded-lg bg-ink-50 px-2.5 py-1.5 text-[11px] font-semibold text-ink-600 transition-colors hover:bg-ink-100"
            >
              {expanded === g.group ? 'Hide details' : 'View details'}
              <ChevronRight className={`h-3 w-3 transition-transform ${expanded === g.group ? 'rotate-90' : ''}`} />
            </button>
          </Card>
        ))}
      </div>

      {/* Detail panel */}
      {expanded && (() => {
        const g: GroupHealth = groupHealth.find((x) => x.group === expanded)!;
        return (
          <Card className="mt-3 p-4 animate-slide-down">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-ink-900">{g.group} — Health Breakdown</span>
              <StatusBadge status={g.status} />
            </div>
            <p className="mt-2 text-xs font-medium text-ink-600">{g.note}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
              {[
                { label: 'Attendance', value: `${g.attendance}%` },
                { label: 'Exam Average', value: `${g.examAvg}%` },
                { label: 'Failed Students', value: String(g.failed) },
                { label: 'Syllabus Coverage', value: `${g.syllabus}%` },
                { label: 'Trend', value: g.trend === 'up' ? 'Improving' : g.trend === 'down' ? 'Declining' : 'Stable' },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-ink-200/70 bg-white p-3">
                  <div className="text-lg font-extrabold text-ink-900">{m.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{m.label}</div>
                </div>
              ))}
            </div>
          </Card>
        );
      })()}
    </section>
  );
}
