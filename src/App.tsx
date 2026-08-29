import { useState } from 'react';
import { AlertsSummary, FilterBar, Header } from '@/components/Header';
import { CollegeOverview } from '@/components/sections/CollegeOverview';
import { StudentAttendance } from '@/components/sections/StudentAttendance';
import { FacultyMonitoring } from '@/components/sections/FacultyMonitoring';
import { ExamPerformance } from '@/components/sections/ExamPerformance';
import { ResultAnalysis } from '@/components/sections/ResultAnalysis';
import { SyllabusCoverage } from '@/components/sections/SyllabusCoverage';
import { ProgressTrends } from '@/components/sections/ProgressTrends';
import { AttendanceVsPerformance } from '@/components/sections/AttendanceVsPerformance';
import { GroupHealthOverview } from '@/components/sections/GroupHealth';
import { EarlyWarning } from '@/components/sections/EarlyWarning';
import { AIInsights } from '@/components/sections/AIInsights';
import { PrincipalAction } from '@/components/sections/PrincipalAction';
import { alertCategories } from '@/data';

function App() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const totalAlerts = alertCategories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-ink-900">
      <Header alertCount={totalAlerts} />

      <main className="mx-auto max-w-[1440px] space-y-6 px-6 py-6">
        {/* Filters */}
        <FilterBar />

        {/* Alerts summary */}
        <AlertsSummary
          categories={alertCategories}
          total={totalAlerts}
          active={activeAlert}
          onCategoryClick={(key) => setActiveAlert((prev) => (prev === key ? null : key))}
        />

        {/* 1. Today's overview */}
        <CollegeOverview />

        {/* 2. Attendance + Faculty */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <StudentAttendance />
          <FacultyMonitoring />
        </div>

        {/* 3. Exam performance */}
        <ExamPerformance />

        {/* 4. Result analysis */}
        <ResultAnalysis />

        {/* 5. Syllabus coverage */}
        <SyllabusCoverage />

        {/* 6. Progress trends */}
        <ProgressTrends />

        {/* 7. Attendance vs performance */}
        <AttendanceVsPerformance />

        {/* 8. Group health */}
        <GroupHealthOverview />

        {/* 9. Early warning + AI insights */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <EarlyWarning />
          <AIInsights />
        </div>

        {/* 10. Principal action */}
        <PrincipalAction />

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-ink-200 pt-4 text-[11px] font-medium text-ink-400">
          <span>JCLG Platform · Module 6 — Progress Monitoring & AI Alerts</span>
          <span>UI demonstration data · AY 2026–27</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
