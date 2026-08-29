import { Bell, ChevronDown, GraduationCap, Search } from 'lucide-react';
import type { AlertCategory } from '@/types';

export function Header({ alertCount = 0 }: { alertCount?: number }) {
  const today = new Date('2026-08-26').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 border-b border-ink-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-ink-900">JCLG</span>
                <span className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold text-ink-600">Principal</span>
              </div>
              <span className="text-[11px] font-medium text-ink-500">Junior College Management Platform</span>
            </div>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-1.5 lg:flex">
              <Search className="h-3.5 w-3.5 text-ink-400" />
              <input
                placeholder="Search students, faculty, sections…"
                className="w-44 bg-transparent text-xs text-ink-700 placeholder:text-ink-400 focus:outline-none"
              />
            </div>
            <div className="hidden items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 md:flex">
              <span className="text-xs font-semibold text-ink-700">AY 2026–27</span>
              <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
            </div>
            <button className="relative rounded-lg border border-ink-200 bg-white p-2 text-ink-600 transition-colors hover:bg-ink-50">
              <Bell className="h-4 w-4" />
              {alertCount > 0 && (
                <>
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[9px] font-bold text-white">
                    {alertCount}
                  </span>
                  <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-danger-500/40 animate-pulse-ring" />
                </>
              )}
            </button>
            <div className="flex items-center gap-2.5 rounded-lg border border-ink-200 bg-white py-1 pl-1 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                DR
              </div>
              <div className="hidden leading-tight sm:block">
                <div className="text-xs font-bold text-ink-900">Dr. R. Murthy</div>
                <div className="text-[10px] font-medium text-ink-500">Principal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Title row */}
        <div className="mt-4 flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Progress Monitoring & AI Alerts</h1>
          <p className="text-sm text-ink-500">
            Monitor student attendance, academic performance, faculty activity, syllabus progress and early-warning indicators.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-ink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
          {today}
        </div>
      </div>
    </header>
  );
}

export function FilterBar() {
  const filters = [
    { label: 'Academic Year', value: '2026–27' },
    { label: 'Group', value: 'All Groups' },
    { label: 'Section', value: 'All Sections' },
    { label: 'Date', value: 'Today' },
    { label: 'Examination', value: 'Select Examination', muted: true },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {filters.map((f) => (
        <button
          key={f.label}
          className="group flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{f.label}</span>
          <span className={`text-xs font-semibold ${f.muted ? 'text-ink-400' : 'text-ink-800'}`}>{f.value}</span>
          <ChevronDown className="h-3.5 w-3.5 text-ink-400 transition-transform group-hover:translate-y-0.5" />
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <button className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-50">
          Reset
        </button>
        <button className="rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-700">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export function AlertsSummary({
  categories,
  total,
  onCategoryClick,
  active,
}: {
  categories: AlertCategory[];
  total: number;
  onCategoryClick?: (key: string) => void;
  active?: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-3 shadow-card">
      <div className="flex items-center gap-2.5 pr-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger-50 text-danger-600 ring-1 ring-danger-100">
          <Bell className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <div className="text-lg font-extrabold text-ink-900">{total}</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Active Alerts</div>
        </div>
      </div>
      <div className="h-9 w-px bg-ink-200" />
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const isActive = active === c.key;
          return (
            <button
              key={c.key}
              onClick={() => onCategoryClick?.(c.key)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors ${
                isActive ? 'border-brand-300 bg-brand-50' : 'border-ink-200 bg-white hover:bg-ink-50'
              }`}
            >
              <span className={`h-2 w-2 rounded-full bg-${c.color}-500`} />
              <span className="text-xs font-semibold text-ink-700">{c.label}</span>
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white bg-${c.color}-500`}>{c.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
