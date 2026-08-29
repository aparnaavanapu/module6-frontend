import { useState } from 'react';
import {
  Award,
  ChevronRight,
  ClipboardList,
  TrendingDown,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import { Card, Pill, ProgressBar, SectionHeader, TrendIndicator } from '@/components/ui';
import { GroupedBars } from '@/components/charts';
import { collegeExamSummary, groupExamPerf } from '@/data';
import type { GroupCode } from '@/types';

const groupColors: Record<GroupCode, string> = {
  MPC: '#3471f5', BiPC: '#22a17f', MEC: '#5996ff', CEC: '#f5840a', HEC: '#8ebcff',
};

function Metric({ label, value, tone, icon }: { label: string; value: string; tone: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-white p-3">
      <div className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>{icon}</div>
      <div className="text-lg font-extrabold text-ink-900">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{label}</div>
    </div>
  );
}

export function ExamPerformance() {
  const [exam] = useState('Mid-Term Examination');
  const [drillGroup, setDrillGroup] = useState<GroupCode | null>(null);
  const [drillSection, setDrillSection] = useState<string | null>(null);

  const groupBars = groupExamPerf.map((g) => ({ label: g.group, value: g.avg, color: groupColors[g.group] }));

  const activeGroup = groupExamPerf.find((g) => g.group === drillGroup);
  const activeSection = activeGroup?.sections.find((s) => s.section === drillSection);

  return (
    <section>
      <SectionHeader
        title="Examination Performance"
        subtitle="College → Group → Section → Subject"
        icon={<ClipboardList className="h-4.5 w-4.5" />}
        action={
          <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Exam</span>
            <span className="text-xs font-semibold text-ink-800">{exam}</span>
          </div>
        }
      />

      {/* College-level summary */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <Metric label="Average" value={`${collegeExamSummary.avg}%`} tone="bg-brand-50 text-brand-600" icon={<TrendingUp className="h-3.5 w-3.5" />} />
        <Metric label="Pass" value={`${collegeExamSummary.pass}%`} tone="bg-success-50 text-success-600" icon={<Award className="h-3.5 w-3.5" />} />
        <Metric label="Fail" value={`${collegeExamSummary.fail}%`} tone="bg-danger-50 text-danger-600" icon={<TrendingDown className="h-3.5 w-3.5" />} />
        <Metric label="Highest" value={`${collegeExamSummary.highest}%`} tone="bg-teal-50 text-teal-600" icon={<Trophy className="h-3.5 w-3.5" />} />
        <Metric label="Lowest" value={`${collegeExamSummary.lowest}%`} tone="bg-warning-50 text-warning-600" icon={<TrendingDown className="h-3.5 w-3.5" />} />
        <Metric label="Appeared" value={String(collegeExamSummary.appeared)} tone="bg-ink-100 text-ink-700" icon={<ClipboardList className="h-3.5 w-3.5" />} />
        <Metric label="Passed" value={String(collegeExamSummary.passed)} tone="bg-success-50 text-success-600" icon={<Award className="h-3.5 w-3.5" />} />
        <Metric label="Failed" value={String(collegeExamSummary.failed)} tone="bg-danger-50 text-danger-600" icon={<TrendingDown className="h-3.5 w-3.5" />} />
      </div>

      {/* Group-wise + chart */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-1">
          <span className="text-sm font-bold text-ink-900">Group-wise Comparison</span>
          <div className="mt-3"><GroupedBars data={groupBars} height={140} max={100} /></div>
        </Card>

        <Card className="overflow-hidden lg:col-span-2">
          <div className="border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
            <span className="text-sm font-bold text-ink-900">Group-wise Performance</span>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ink-100 text-[10px] uppercase tracking-wide text-ink-400">
                  <th className="px-4 py-2.5 font-bold">Group</th>
                  <th className="px-4 py-2.5 font-bold">Avg %</th>
                  <th className="px-4 py-2.5 font-bold">Pass %</th>
                  <th className="px-4 py-2.5 font-bold">Fail %</th>
                  <th className="px-4 py-2.5 font-bold">Students</th>
                  <th className="px-4 py-2.5 font-bold">Failed</th>
                  <th className="px-4 py-2.5 font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {groupExamPerf.map((g) => (
                  <tr
                    key={g.group}
                    onClick={() => { setDrillGroup(drillGroup === g.group ? null : g.group); setDrillSection(null); }}
                    className="cursor-pointer table-row-hover"
                  >
                    <td className="px-4 py-2.5 font-bold text-ink-900">{g.group}</td>
                    <td className="px-4 py-2.5">
                      <span className={g.avg >= 78 ? 'text-success-600 font-bold' : g.avg >= 72 ? 'text-brand-600 font-bold' : 'text-warning-600 font-bold'}>{g.avg}%</span>
                    </td>
                    <td className="px-4 py-2.5 text-success-600 font-semibold">{g.pass}%</td>
                    <td className="px-4 py-2.5 text-danger-600 font-semibold">{g.fail}%</td>
                    <td className="px-4 py-2.5 text-ink-700">{g.students}</td>
                    <td className="px-4 py-2.5">
                      <span className={g.failed >= 20 ? 'chip bg-danger-50 text-danger-700' : 'chip bg-warning-50 text-warning-700'}>{g.failed}</span>
                    </td>
                    <td className="px-4 py-2.5"><ChevronRight className={`h-3.5 w-3.5 text-ink-400 transition-transform ${drillGroup === g.group ? 'rotate-90' : ''}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Drill: Group → Section → Subject */}
      {activeGroup && (
        <Card className="mt-4 overflow-hidden animate-slide-down">
          <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-500">Drill-down</span>
            <span className="text-xs font-semibold text-ink-700">{activeGroup.group}</span>
            {activeSection && (
              <>
                <ChevronRight className="h-3 w-3 text-ink-300" />
                <span className="text-xs font-semibold text-ink-700">Section {activeSection.section}</span>
              </>
            )}
          </div>

          {/* Section comparison */}
          {!activeSection && (
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeGroup.sections.map((s) => (
                <button
                  key={s.section}
                  onClick={() => setDrillSection(s.section)}
                  className="rounded-xl border border-ink-200 bg-white p-4 text-left transition-all hover:border-brand-300 hover:shadow-cardHover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-ink-900">Section {s.section}</span>
                    <span className={`text-lg font-extrabold ${s.avg >= 78 ? 'text-success-600' : s.avg >= 72 ? 'text-brand-600' : 'text-warning-600'}`}>{s.avg}%</span>
                  </div>
                  <div className="mt-2"><ProgressBar value={s.avg} color={s.avg >= 78 ? 'success' : s.avg >= 72 ? 'brand' : 'warning'} /></div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600">
                    View subjects <ChevronRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Subject detail */}
          {activeSection && (
            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex items-center gap-2 px-4 pt-3">
                <button onClick={() => setDrillSection(null)} className="btn-ghost">← Back to sections</button>
              </div>
              <table className="mt-1 w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ink-100 text-[10px] uppercase tracking-wide text-ink-400">
                    <th className="px-4 py-2.5 font-bold">Subject</th>
                    <th className="px-4 py-2.5 font-bold">Avg Marks</th>
                    <th className="px-4 py-2.5 font-bold">Avg %</th>
                    <th className="px-4 py-2.5 font-bold">Pass %</th>
                    <th className="px-4 py-2.5 font-bold">Fail %</th>
                    <th className="px-4 py-2.5 font-bold">Highest</th>
                    <th className="px-4 py-2.5 font-bold">Lowest</th>
                    <th className="px-4 py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {activeSection.subjects.map((sub) => {
                    const weak = sub.avgPct < 65;
                    return (
                      <tr key={sub.subject} className={`table-row-hover ${weak ? 'bg-warning-50/40' : ''}`}>
                        <td className="px-4 py-2.5 font-semibold text-ink-800">{sub.subject}</td>
                        <td className="px-4 py-2.5 text-ink-700">{sub.avgMarks}</td>
                        <td className="px-4 py-2.5 font-bold text-ink-900">{sub.avgPct}%</td>
                        <td className="px-4 py-2.5 text-success-600 font-semibold">{sub.pass}%</td>
                        <td className="px-4 py-2.5 text-danger-600 font-semibold">{sub.fail}%</td>
                        <td className="px-4 py-2.5 text-ink-700">{sub.highest}</td>
                        <td className="px-4 py-2.5 text-ink-700">{sub.lowest}</td>
                        <td className="px-4 py-2.5">
                          {weak ? <Pill color="warning">Weak</Pill> : <Pill color="success">On Track</Pill>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </section>
  );
}
