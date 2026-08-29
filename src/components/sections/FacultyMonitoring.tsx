import {
  AlertCircle,
  CalendarX,
  ClipboardList,
  Clock,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import { Card, Pill, ProgressBar, SectionHeader } from '@/components/ui';
import { facultyRows } from '@/data';
import type { FacultyRow } from '@/types';

const statusConfig: Record<FacultyRow['status'], { label: string; color: 'success' | 'danger' | 'warning' | 'ink' | 'brand' }> = {
  present: { label: 'Present', color: 'success' },
  absent: { label: 'Absent', color: 'danger' },
  leave: { label: 'On Leave', color: 'warning' },
  'no-period': { label: 'No Scheduled Period', color: 'ink' },
  'schedule-issue': { label: 'Schedule Issue', color: 'brand' },
};

export function FacultyMonitoring() {
  const present = facultyRows.filter((f) => f.status === 'present').length;
  const absent = facultyRows.filter((f) => f.status === 'absent').length;
  const onLeave = facultyRows.filter((f) => f.status === 'leave').length;
  const issues = facultyRows.filter((f) => f.status === 'schedule-issue' || f.status === 'no-period').length;
  const total = facultyRows.length;
  const pct = ((present / total) * 100).toFixed(1);

  return (
    <section>
      <SectionHeader
        title="Faculty Monitoring"
        subtitle="Scheduled teaching periods and faculty status for today"
        icon={<ClipboardList className="h-4.5 w-4.5" />}
      />

      {/* Status tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {[
          { icon: <Users className="h-4 w-4" />, label: 'Total Faculty', value: '86', color: 'bg-ink-100 text-ink-700' },
          { icon: <UserCheck className="h-4 w-4" />, label: 'Present', value: String(present), color: 'bg-success-50 text-success-700' },
          { icon: <UserX className="h-4 w-4" />, label: 'Absent', value: String(absent), color: 'bg-danger-50 text-danger-700' },
          { icon: <CalendarX className="h-4 w-4" />, label: 'On Leave', value: String(onLeave), color: 'bg-warning-50 text-warning-700' },
          { icon: <Clock className="h-4 w-4" />, label: 'No Period', value: String(facultyRows.filter((f) => f.status === 'no-period').length), color: 'bg-ink-100 text-ink-600' },
          { icon: <AlertCircle className="h-4 w-4" />, label: 'Schedule Issue', value: String(facultyRows.filter((f) => f.status === 'schedule-issue').length), color: 'bg-brand-50 text-brand-700' },
        ].map((t) => (
          <Card key={t.label} hover className="p-3.5">
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${t.color}`}>{t.icon}</div>
            <div className="text-xl font-extrabold text-ink-900">{t.value}</div>
            <div className="text-[11px] font-semibold text-ink-500">{t.label}</div>
          </Card>
        ))}
      </div>

      {/* Attendance bar + note */}
      <Card className="mt-4 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3 md:w-72">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-ink-900">{pct}%</div>
              <div className="text-xs font-semibold text-ink-500">Faculty Attendance</div>
            </div>
          </div>
          <div className="flex-1">
            <ProgressBar value={Number(pct)} color="teal" height="h-3" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-warning-50 px-3 py-2 text-xs font-medium text-warning-700 ring-1 ring-warning-100">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>Faculty attendance tracking is a future data-model requirement. Timetable data shown below is not actual attendance.</span>
          </div>
        </div>
      </Card>

      {/* Faculty table */}
      <Card className="mt-4 overflow-hidden">
        <div className="border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
          <span className="text-sm font-bold text-ink-900">Faculty Status — Today</span>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-100 text-[10px] uppercase tracking-wide text-ink-400">
                <th className="px-4 py-2.5 font-bold">Faculty Name</th>
                <th className="px-4 py-2.5 font-bold">Department</th>
                <th className="px-4 py-2.5 font-bold">Today's Periods</th>
                <th className="px-4 py-2.5 font-bold">Completed</th>
                <th className="px-4 py-2.5 font-bold">Progress</th>
                <th className="px-4 py-2.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {facultyRows.map((f, i) => {
                const sc = statusConfig[f.status];
                const prog = f.scheduled > 0 ? (f.completed / f.scheduled) * 100 : 0;
                return (
                  <tr key={i} className="table-row-hover">
                    <td className="px-4 py-2.5 font-semibold text-ink-800">{f.name}</td>
                    <td className="px-4 py-2.5 text-ink-600">{f.dept}</td>
                    <td className="px-4 py-2.5 text-ink-700">{f.scheduled}</td>
                    <td className="px-4 py-2.5 text-ink-700">{f.completed}</td>
                    <td className="px-4 py-2.5">
                      {f.scheduled > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20"><ProgressBar value={prog} height="h-1.5" color={prog >= 75 ? 'success' : prog >= 50 ? 'brand' : 'warning'} /></div>
                          <span className="text-[10px] font-bold text-ink-500">{Math.round(prog)}%</span>
                        </div>
                      ) : (
                        <span className="text-ink-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5"><Pill color={sc.color}>{sc.label}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
