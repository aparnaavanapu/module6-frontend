import { useState } from 'react';
import { BookOpen, CalendarClock, Info } from 'lucide-react';
import { Card, Pill, ProgressBar, SectionHeader } from '@/components/ui';
import { facultyCoverage, syllabusRows } from '@/data';
import type { SyllabusRow } from '@/types';

const statusConfig: Record<SyllabusRow['status'], { label: string; color: 'success' | 'brand' | 'warning' | 'danger' }> = {
  'ahead': { label: 'Ahead of Schedule', color: 'success' },
  'on-schedule': { label: 'On Schedule', color: 'brand' },
  'behind': { label: 'Behind Schedule', color: 'warning' },
  'critical-delay': { label: 'Critical Delay', color: 'danger' },
};

export function SyllabusCoverage() {
  const [view, setView] = useState<'subject' | 'faculty'>('subject');

  return (
    <section>
      <SectionHeader
        title="Faculty & Syllabus Coverage"
        subtitle="Planned vs completed syllabus by group, section, subject and faculty"
        icon={<BookOpen className="h-4.5 w-4.5" />}
        action={
          <div className="flex items-center gap-1 rounded-lg bg-ink-100 p-0.5">
            {(['subject', 'faculty'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
                  view === v ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                {v} View
              </button>
            ))}
          </div>
        }
      />

      {/* Data-model note */}
      <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <p className="text-xs font-medium text-brand-800">
          The database currently contains timetable, assignments and study material — but no explicit syllabus/chapter/topic coverage tracking.
          The values below are UI demonstration data; syllabus coverage is a future data-model requirement.
        </p>
      </div>

      {view === 'subject' ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {syllabusRows.map((row) => {
            const sc = statusConfig[row.status];
            const remaining = row.planned - row.completed;
            return (
              <Card key={`${row.group}-${row.subject}`} hover className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-bold text-ink-900">{row.subject}</div>
                    <div className="text-[11px] font-semibold text-ink-400">{row.group} · {row.faculty}</div>
                  </div>
                  <Pill color={sc.color}>{sc.label}</Pill>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <ProgressBar value={row.pct} color={sc.color === 'success' ? 'success' : sc.color === 'brand' ? 'brand' : sc.color === 'warning' ? 'warning' : 'danger'} height="h-2.5" />
                  <span className="w-10 text-right text-sm font-extrabold text-ink-900">{row.pct}%</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-ink-50 py-1.5">
                    <div className="text-sm font-bold text-ink-800">{row.planned}%</div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-ink-400">Planned</div>
                  </div>
                  <div className="rounded-lg bg-success-50 py-1.5">
                    <div className="text-sm font-bold text-success-700">{row.completed}%</div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-success-500">Completed</div>
                  </div>
                  <div className="rounded-lg bg-warning-50 py-1.5">
                    <div className="text-sm font-bold text-warning-700">{remaining}%</div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-warning-500">Remaining</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
            <span className="text-sm font-bold text-ink-900">Faculty-level Coverage</span>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ink-100 text-[10px] uppercase tracking-wide text-ink-400">
                  <th className="px-4 py-2.5 font-bold">Faculty</th>
                  <th className="px-4 py-2.5 font-bold">Subject</th>
                  <th className="px-4 py-2.5 font-bold">Section</th>
                  <th className="px-4 py-2.5 font-bold">Expected</th>
                  <th className="px-4 py-2.5 font-bold">Actual</th>
                  <th className="px-4 py-2.5 font-bold">Difference</th>
                  <th className="px-4 py-2.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {facultyCoverage.map((f, i) => {
                  const diff = f.actual - f.expected;
                  const sc = statusConfig[f.status];
                  return (
                    <tr key={i} className="table-row-hover">
                      <td className="px-4 py-2.5 font-semibold text-ink-800">{f.faculty}</td>
                      <td className="px-4 py-2.5 text-ink-700">{f.subject}</td>
                      <td className="px-4 py-2.5 text-ink-600">{f.section}</td>
                      <td className="px-4 py-2.5 text-ink-700">{f.expected}%</td>
                      <td className="px-4 py-2.5 font-bold text-ink-900">{f.actual}%</td>
                      <td className="px-4 py-2.5">
                        <span className={`font-bold ${diff >= 0 ? 'text-success-600' : diff >= -8 ? 'text-warning-600' : 'text-danger-600'}`}>
                          {diff >= 0 ? '+' : ''}{diff}%
                        </span>
                      </td>
                      <td className="px-4 py-2.5"><Pill color={sc.color}>{sc.label}</Pill></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-ink-500">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success-500" /> Ahead</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-500" /> On Schedule</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning-500" /> Behind</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-danger-500" /> Critical Delay</span>
        <span className="flex items-center gap-1.5 text-ink-400"><CalendarClock className="h-3 w-3" /> Target: 70% by this date</span>
      </div>
    </section>
  );
}
