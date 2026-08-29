import { useState } from 'react';
import {
  ChevronRight,
  Eye,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
} from 'lucide-react';
import { Card, ProgressBar, SectionHeader, TrendIndicator } from '@/components/ui';
import { LineChart, GroupedBars } from '@/components/charts';
import { absentStudents, groupAttendance, attendanceTrend7 } from '@/data';
import type { GroupCode } from '@/types';

const groupColors: Record<GroupCode, string> = {
  MPC: '#3471f5',
  BiPC: '#22a17f',
  MEC: '#5996ff',
  CEC: '#f5840a',
  HEC: '#8ebcff',
};

export function StudentAttendance() {
  const [expandedGroup, setExpandedGroup] = useState<GroupCode | null>('MPC');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAbsent, setShowAbsent] = useState(false);
  const [trendRange, setTrendRange] = useState<'today' | '7' | '30'>('7');

  const totalStudents = groupAttendance.reduce((s, g) => s + g.total, 0);
  const totalPresent = groupAttendance.reduce((s, g) => s + g.present, 0);
  const totalAbsent = groupAttendance.reduce((s, g) => s + g.absent, 0);
  const overallPct = ((totalPresent / totalStudents) * 100).toFixed(1);

  const trendData =
    trendRange === 'today' ? [94.9] :
    trendRange === '7' ? attendanceTrend7 :
    Array.from({ length: 30 }, (_, i) => 92 + Math.round(Math.sin(i / 3) * 2 + (i / 30) * 2 * 10) / 10);

  const sectionBars = groupAttendance.map((g) => ({
    label: g.group,
    value: g.pct,
    color: groupColors[g.group],
  }));

  const filteredAbsent = expandedGroup
    ? absentStudents.filter((s) => s.group === expandedGroup && (!expandedSection || s.section === expandedSection))
    : absentStudents;

  return (
    <section>
      <SectionHeader
        title="Student Attendance Monitoring"
        subtitle="College → Group → Section → Student"
        icon={<Users className="h-4.5 w-4.5" />}
        action={
          <button
            onClick={() => setShowAbsent((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            <Eye className="h-3.5 w-3.5" />
            {showAbsent ? 'Hide' : 'View'} Absent Students
          </button>
        }
      />

      {/* Top metrics + trend */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-ink-900">Attendance Trend</span>
            <div className="flex items-center gap-1 rounded-lg bg-ink-100 p-0.5">
              {(['today', '7', '30'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTrendRange(r)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    trendRange === r ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
                  }`}
                >
                  {r === 'today' ? 'Today' : r === '7' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Present</div>
              <div className="text-xl font-extrabold text-success-600">{totalPresent.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Absent</div>
              <div className="text-xl font-extrabold text-danger-600">{totalAbsent}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Total</div>
              <div className="text-xl font-extrabold text-ink-900">{totalStudents.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Attendance</div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-ink-900">{overallPct}%</span>
                <TrendIndicator trend="up" />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <LineChart data={trendData} height={120} color="#3471f5" yMin={90} yMax={97} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-600" />
            <span className="text-sm font-bold text-ink-900">Group-wise Attendance</span>
          </div>
          <GroupedBars data={sectionBars} height={150} max={100} />
          <div className="mt-3 space-y-2">
            {groupAttendance.map((g) => (
              <div key={g.group} className="flex items-center gap-2">
                <span className="w-12 text-xs font-bold text-ink-700">{g.group}</span>
                <ProgressBar value={g.pct} color={g.pct >= 95 ? 'success' : g.pct >= 90 ? 'brand' : 'warning'} />
                <span className="w-12 text-right text-xs font-bold text-ink-700">{g.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Drill-down: Group → Section */}
      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
          <span className="text-xs font-bold uppercase tracking-wide text-ink-500">Drill-down</span>
          <span className="text-xs font-semibold text-ink-400">College</span>
          <ChevronRight className="h-3 w-3 text-ink-300" />
          <span className="text-xs font-semibold text-ink-700">{expandedGroup ?? 'Select group'}</span>
          {expandedSection && (
            <>
              <ChevronRight className="h-3 w-3 text-ink-300" />
              <span className="text-xs font-semibold text-ink-700">Section {expandedSection}</span>
            </>
          )}
        </div>

        <div className="divide-y divide-ink-100">
          {groupAttendance.map((g) => {
            const open = expandedGroup === g.group;
            return (
              <div key={g.group}>
                <button
                  onClick={() => {
                    setExpandedGroup(open ? null : g.group);
                    setExpandedSection(null);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-ink-50"
                >
                  <ChevronRight className={`h-4 w-4 text-ink-400 transition-transform ${open ? 'rotate-90' : ''}`} />
                  <span className="w-14 text-sm font-bold text-ink-900">{g.group}</span>
                  <div className="flex flex-1 items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-ink-500"><Users className="h-3 w-3" /> {g.total}</span>
                    <span className="flex items-center gap-1 text-xs text-success-600"><UserCheck className="h-3 w-3" /> {g.present}</span>
                    <span className="flex items-center gap-1 text-xs text-danger-600"><UserX className="h-3 w-3" /> {g.absent}</span>
                  </div>
                  <div className="w-40">
                    <ProgressBar value={g.pct} color={g.pct >= 95 ? 'success' : g.pct >= 90 ? 'brand' : 'warning'} />
                  </div>
                  <span className="w-12 text-right text-sm font-bold text-ink-900">{g.pct}%</span>
                  <TrendIndicator trend={g.trend} />
                </button>

                {open && (
                  <div className="bg-ink-50/40 px-4 pb-3 animate-slide-down">
                    <div className="space-y-1.5 pt-1">
                      {g.sections.map((s) => {
                        const sOpen = expandedSection === s.section;
                        return (
                          <div key={s.section} className="rounded-lg bg-white ring-1 ring-ink-200/60">
                            <button
                              onClick={() => setExpandedSection(sOpen ? null : s.section)}
                              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-ink-50"
                            >
                              <ChevronRight className={`h-3.5 w-3.5 text-ink-400 transition-transform ${sOpen ? 'rotate-90' : ''}`} />
                              <span className="w-20 text-xs font-bold text-ink-700">Section {s.section}</span>
                              <span className="text-xs text-ink-500">{s.present}/{s.total} present</span>
                              <div className="flex-1">
                                <ProgressBar value={s.pct} height="h-1.5" color={s.pct >= 95 ? 'success' : s.pct >= 90 ? 'brand' : 'warning'} />
                              </div>
                              <span className="w-10 text-right text-xs font-bold text-ink-900">{s.pct}%</span>
                              <TrendIndicator trend={s.trend} />
                            </button>
                            {sOpen && (
                              <div className="border-t border-ink-100 px-3 py-2.5 animate-slide-down">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
                                    Absent — {g.group} · Section {s.section}
                                  </span>
                                  <span className="text-xs font-bold text-danger-600">{s.absent} students</span>
                                </div>
                                <div className="overflow-x-auto scrollbar-thin">
                                  <table className="w-full text-left text-xs">
                                    <thead>
                                      <tr className="text-[10px] uppercase tracking-wide text-ink-400">
                                        <th className="py-1.5 pr-3 font-bold">Roll No.</th>
                                        <th className="py-1.5 pr-3 font-bold">Student</th>
                                        <th className="py-1.5 pr-3 font-bold">Status</th>
                                        <th className="py-1.5 font-bold">Leave</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-ink-100">
                                      {absentStudents
                                        .filter((a) => a.group === g.group && a.section === s.section)
                                        .map((a) => (
                                          <tr key={a.roll} className="table-row-hover">
                                            <td className="py-2 pr-3 font-mono text-ink-600">{a.roll}</td>
                                            <td className="py-2 pr-3 font-semibold text-ink-800">{a.name}</td>
                                            <td className="py-2 pr-3">
                                              <span className="chip bg-danger-50 text-danger-700">Absent</span>
                                            </td>
                                            <td className="py-2 text-ink-500">{a.leave ?? '—'}</td>
                                          </tr>
                                        ))}
                                      {absentStudents.filter((a) => a.group === g.group && a.section === s.section).length === 0 && (
                                        <tr>
                                          <td colSpan={4} className="py-3 text-center text-ink-400">No absent students recorded for this section.</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Full absent list */}
      {showAbsent && (
        <Card className="mt-4 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
            <span className="text-sm font-bold text-ink-900">Absent Students — {expandedGroup ?? 'All Groups'}{expandedSection ? ` · Section ${expandedSection}` : ''}</span>
            <span className="text-xs font-bold text-danger-600">{filteredAbsent.length} students</span>
          </div>
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white">
                <tr className="text-[10px] uppercase tracking-wide text-ink-400">
                  <th className="px-4 py-2 font-bold">Roll No.</th>
                  <th className="px-4 py-2 font-bold">Student Name</th>
                  <th className="px-4 py-2 font-bold">Group</th>
                  <th className="px-4 py-2 font-bold">Section</th>
                  <th className="px-4 py-2 font-bold">Status</th>
                  <th className="px-4 py-2 font-bold">Leave</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filteredAbsent.map((a) => (
                  <tr key={a.roll} className="table-row-hover">
                    <td className="px-4 py-2.5 font-mono text-ink-600">{a.roll}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink-800">{a.name}</td>
                    <td className="px-4 py-2.5"><span className="chip bg-brand-50 text-brand-700">{a.group}</span></td>
                    <td className="px-4 py-2.5 text-ink-600">{a.section}</td>
                    <td className="px-4 py-2.5"><span className="chip bg-danger-50 text-danger-700">Absent</span></td>
                    <td className="px-4 py-2.5 text-ink-500">{a.leave ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </section>
  );
}
