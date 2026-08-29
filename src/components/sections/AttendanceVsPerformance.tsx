import { BarChart3, GitCompareArrows } from 'lucide-react';
import { Card, ProgressBar, SectionHeader } from '@/components/ui';
import { ScatterPlot } from '@/components/charts';
import { attPerfBuckets } from '@/data';

export function AttendanceVsPerformance() {
  const scatterData = attPerfBuckets.map((b) => ({
    x: b.avgAttendance,
    y: b.avgResult,
    size: b.students,
    label: b.band,
    color: b.avgResult >= 80 ? '#12b85f' : b.avgResult >= 70 ? '#3471f5' : '#e44848',
  }));

  return (
    <section>
      <SectionHeader
        title="Attendance vs Performance"
        subtitle="Identifying whether low attendance correlates with weaker results"
        icon={<GitCompareArrows className="h-4.5 w-4.5" />}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Scatter */}
        <Card className="p-4 lg:col-span-3">
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-brand-600" />
            <span className="text-sm font-bold text-ink-900">Attendance vs Result (bubble size = students)</span>
          </div>
          <ScatterPlot data={scatterData} height={260} />
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {attPerfBuckets.map((b) => (
              <div key={b.band} className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.avgResult >= 80 ? '#12b85f' : b.avgResult >= 70 ? '#3471f5' : '#e44848' }} />
                {b.band}
              </div>
            ))}
          </div>
        </Card>

        {/* Comparison bars */}
        <Card className="p-4 lg:col-span-2">
          <span className="text-sm font-bold text-ink-900">Average Result by Attendance Band</span>
          <div className="mt-4 space-y-4">
            {attPerfBuckets.map((b) => (
              <div key={b.band}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-bold text-ink-700">{b.band}</span>
                  <span className="font-semibold text-ink-500">{b.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1"><ProgressBar value={b.avgResult} color={b.avgResult >= 80 ? 'success' : b.avgResult >= 70 ? 'brand' : 'danger'} height="h-3" /></div>
                  <span className="w-12 text-right text-sm font-extrabold text-ink-900">{b.avgResult}%</span>
                </div>
                <div className="mt-1 text-[10px] font-medium text-ink-400">Avg attendance {b.avgAttendance}%</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-danger-50/60 px-3 py-2.5 text-xs font-medium text-danger-700 ring-1 ring-danger-100">
            Low-attendance students average 21 points below high-attendance students — a strong correlation.
          </div>
        </Card>
      </div>
    </section>
  );
}
