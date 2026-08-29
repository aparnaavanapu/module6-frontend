import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  XCircle,
} from 'lucide-react';
import { Card, ProgressBar, SectionHeader } from '@/components/ui';
import { Donut } from '@/components/charts';
import { gradeBuckets, multiFailStudents, resultSummary } from '@/data';

export function ResultAnalysis() {
  const total = resultSummary.passed + resultSummary.failed + resultSummary.pending;
  const summaryItems = [
    { label: 'Passed', value: resultSummary.passed, color: 'text-success-600', bg: 'bg-success-50', icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: 'Failed', value: resultSummary.failed, color: 'text-danger-600', bg: 'bg-danger-50', icon: <XCircle className="h-4 w-4" /> },
    { label: 'Distinction', value: resultSummary.distinction, color: 'text-teal-600', bg: 'bg-teal-50', icon: <GraduationCap className="h-4 w-4" /> },
    { label: 'First Class', value: resultSummary.firstClass, color: 'text-brand-600', bg: 'bg-brand-50', icon: <BarChart3 className="h-4 w-4" /> },
    { label: 'Second Class', value: resultSummary.secondClass, color: 'text-ink-600', bg: 'bg-ink-100', icon: <BarChart3 className="h-4 w-4" /> },
    { label: 'Below Pass', value: resultSummary.belowPass, color: 'text-danger-600', bg: 'bg-danger-50', icon: <AlertTriangle className="h-4 w-4" /> },
    { label: 'Result Pending', value: resultSummary.pending, color: 'text-warning-600', bg: 'bg-warning-50', icon: <AlertTriangle className="h-4 w-4" /> },
  ];

  return (
    <section>
      <SectionHeader
        title="Result Analysis"
        subtitle="Grade distribution and students with multiple subject failures"
        icon={<BarChart3 className="h-4.5 w-4.5" />}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Summary tiles */}
        <Card className="p-4 lg:col-span-2">
          <span className="text-sm font-bold text-ink-900">Result Summary</span>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {summaryItems.map((s) => (
              <div key={s.label} className="rounded-xl border border-ink-200/70 p-3">
                <div className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>{s.icon}</div>
                <div className="text-lg font-extrabold text-ink-900">{s.value.toLocaleString()}</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-ink-50/60 p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-bold text-ink-600">Overall Result Rate</span>
              <span className="font-extrabold text-ink-900">{((resultSummary.passed / total) * 100).toFixed(1)}%</span>
            </div>
            <ProgressBar value={(resultSummary.passed / total) * 100} color="success" height="h-2.5" />
          </div>
        </Card>

        {/* Grade distribution donut */}
        <Card className="p-4">
          <span className="text-sm font-bold text-ink-900">Grade Distribution</span>
          <div className="mt-2 flex flex-col items-center gap-3">
            <Donut data={gradeBuckets.map((g) => ({ label: g.grade, value: g.count, color: g.color }))} centerLabel="1,248" centerSub="Students" size={160} />
            <div className="grid w-full grid-cols-2 gap-1.5">
              {gradeBuckets.map((g) => (
                <div key={g.grade} className="flex items-center gap-1.5 text-[11px]">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: g.color }} />
                  <span className="font-bold text-ink-700">{g.grade}</span>
                  <span className="text-ink-400">{g.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Multiple subject failures */}
      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-100 bg-danger-50/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-danger-600" />
            <span className="text-sm font-bold text-ink-900">Students with Multiple Subject Failures</span>
          </div>
          <span className="chip bg-danger-100 text-danger-700">{multiFailStudents.length} students</span>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-100 text-[10px] uppercase tracking-wide text-ink-400">
                <th className="px-4 py-2.5 font-bold">Student</th>
                <th className="px-4 py-2.5 font-bold">Group</th>
                <th className="px-4 py-2.5 font-bold">Section</th>
                <th className="px-4 py-2.5 font-bold">Subjects Failed</th>
                <th className="px-4 py-2.5 font-bold">Overall %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {multiFailStudents.map((s) => (
                <tr key={s.name} className="table-row-hover">
                  <td className="px-4 py-2.5 font-semibold text-ink-800">{s.name}</td>
                  <td className="px-4 py-2.5"><span className="chip bg-brand-50 text-brand-700">{s.group}</span></td>
                  <td className="px-4 py-2.5 text-ink-600">{s.section}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {s.failed.map((sub) => (
                        <span key={sub} className="chip bg-danger-50 text-danger-700">{sub}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`font-extrabold ${s.overall < 45 ? 'text-danger-600' : 'text-warning-600'}`}>{s.overall}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
