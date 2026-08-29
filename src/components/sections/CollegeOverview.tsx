import {
  AlertTriangle,
  BookOpenCheck,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { Card, SectionHeader, TrendIndicator } from '@/components/ui';
import { Sparkline } from '@/components/charts';

function KpiTile({
  icon,
  label,
  value,
  sub,
  trend,
  tone,
  spark,
  sparkColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'stable' | 'down';
  tone: 'brand' | 'teal' | 'success' | 'warning' | 'danger';
  spark?: number[];
  sparkColor?: string;
}) {
  const toneMap = {
    brand: 'bg-brand-50 text-brand-600 ring-brand-100',
    teal: 'bg-teal-50 text-teal-600 ring-teal-100',
    success: 'bg-success-50 text-success-600 ring-success-100',
    warning: 'bg-warning-50 text-warning-600 ring-warning-100',
    danger: 'bg-danger-50 text-danger-600 ring-danger-100',
  };
  return (
    <Card hover className="p-4">
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${toneMap[tone]}`}>
          {icon}
        </div>
        {trend && <TrendIndicator trend={trend} />}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-extrabold tracking-tight text-ink-900">{value}</div>
        <div className="text-xs font-semibold text-ink-500">{label}</div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        {sub && <span className="text-[11px] font-medium text-ink-400">{sub}</span>}
        {spark && <div className="w-20"><Sparkline data={spark} color={sparkColor ?? '#3471f5'} /></div>}
      </div>
    </Card>
  );
}

export function CollegeOverview() {
  return (
    <section>
      <SectionHeader
        title="Today's College Overview"
        subtitle="Institutional snapshot for 26 August 2026"
        icon={<TrendingUp className="h-4.5 w-4.5" />}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Students */}
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Users className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-ink-900">Students</span>
            <span className="ml-auto text-[11px] font-semibold text-success-600">↑ 0.3%</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <KpiTile icon={<Users className="h-4 w-4" />} label="Total Students" value="1,248" tone="brand" spark={[1240, 1242, 1245, 1244, 1246, 1247, 1248]} />
            <KpiTile icon={<UserCheck className="h-4 w-4" />} label="Present Today" value="1,184" tone="success" trend="up" spark={[1160, 1172, 1168, 1178, 1180, 1179, 1184]} sparkColor="#12b85f" />
            <KpiTile icon={<UserCheck className="h-4 w-4 rotate-180" />} label="Absent Today" value="64" tone="danger" trend="down" spark={[80, 68, 72, 62, 60, 61, 64]} sparkColor="#e44848" />
            <KpiTile icon={<GraduationCap className="h-4 w-4" />} label="Attendance %" value="94.9%" tone="success" trend="up" spark={[93.2, 94.1, 93.8, 95.0, 94.6, 94.2, 94.9]} sparkColor="#12b85f" />
          </div>
        </Card>

        {/* Faculty */}
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <ClipboardList className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-ink-900">Faculty</span>
            <span className="ml-auto text-[11px] font-semibold text-ink-500">8 of 10 on duty</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <KpiTile icon={<Users className="h-4 w-4" />} label="Total Faculty" value="86" tone="teal" />
            <KpiTile icon={<UserCheck className="h-4 w-4" />} label="Present" value="78" tone="success" trend="up" />
            <KpiTile icon={<UserCheck className="h-4 w-4 rotate-180" />} label="Absent" value="3" tone="danger" />
            <KpiTile icon={<CalendarCheck className="h-4 w-4" />} label="On Leave" value="5" tone="warning" />
            <div className="col-span-2 flex items-center justify-between rounded-xl bg-teal-50/60 px-3 py-2.5">
              <span className="text-xs font-semibold text-teal-800">Faculty Attendance</span>
              <span className="text-lg font-extrabold text-teal-700">90.7%</span>
            </div>
          </div>
        </Card>

        {/* Academic */}
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <BookOpenCheck className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-ink-900">Academic</span>
            <span className="ml-auto text-[11px] font-semibold text-warning-600">24 results pending</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <KpiTile icon={<ClipboardList className="h-4 w-4" />} label="Exams Today" value="2" tone="brand" />
            <KpiTile icon={<ClipboardList className="h-4 w-4" />} label="Results Pending" value="24" tone="warning" />
            <KpiTile icon={<AlertTriangle className="h-4 w-4" />} label="Students Needing Attention" value="75" tone="danger" trend="down" />
            <KpiTile icon={<AlertTriangle className="h-4 w-4" />} label="Active Alerts" value="23" tone="danger" trend="up" />
          </div>
        </Card>
      </div>
    </section>
  );
}
