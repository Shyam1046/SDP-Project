import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  Award, 
  Calendar, 
  BookOpen,
  ArrowRight,
  Bell,
  ChevronRight,
  DollarSign,
  GraduationCap,
  MapPin,
  Users
} from "lucide-react";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getDaysUntil = (dateString) => {
  const days = Math.ceil((new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24));
  return days;
};

const getProgressColor = (progress) => {
  if (progress >= 80) return "from-emerald-400 to-emerald-600";
  if (progress >= 60) return "from-blue-400 to-blue-600";
  return "from-amber-400 to-amber-600";
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function StatCard({ icon, label, value, subtitle, gradient, bgColor }) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group`}>
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function CourseProgressItem({ course }) {
  return (
    <div className="group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {course.name}
            </h3>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
              {course.code}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            Last accessed {course.lastAccessed}
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{course.progress}%</span>
        </div>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getProgressColor(course.progress)} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${course.progress}%` }}
        />
      </div>
    </div>
  );
}

function ExamCard({ exam, daysUntil }) {
  const urgencyColor = daysUntil <= 3 ? "red" : daysUntil <= 7 ? "amber" : "blue";
  const urgencyBg = daysUntil <= 3 ? "bg-red-50" : daysUntil <= 7 ? "bg-amber-50" : "bg-blue-50";
  const urgencyBorder = daysUntil <= 3 ? "border-red-200" : daysUntil <= 7 ? "border-amber-200" : "border-blue-200";
  const urgencyText = daysUntil <= 3 ? "text-red-700" : daysUntil <= 7 ? "text-amber-700" : "text-blue-700";
  
  return (
    <div className={`${urgencyBg} ${urgencyBorder} border rounded-xl p-4 hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{exam.subject}</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(exam.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              {exam.time} • {exam.duration}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5" />
              {exam.room}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${urgencyBg} ${urgencyText} border ${urgencyBorder}`}>
          {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil}d`}
        </span>
      </div>
    </div>
  );
}

function ScheduleItem({ title, time, location, color }) {
  const colorClasses = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    violet: "bg-violet-500"
  };
  
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      <div className={`w-1 h-14 ${colorClasses[color]} rounded-full`} />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuickLink({ to, icon, label, color }) {
  const colorClasses = {
    indigo: "hover:bg-indigo-50 hover:border-indigo-300 group-hover:text-indigo-600",
    emerald: "hover:bg-emerald-50 hover:border-emerald-300 group-hover:text-emerald-600",
    violet: "hover:bg-violet-50 hover:border-violet-300 group-hover:text-violet-600",
    amber: "hover:bg-amber-50 hover:border-amber-300 group-hover:text-amber-600"
  };
  
  return (
    <Link
      to={to}
      className={`group flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl transition-all ${colorClasses[color]}`}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-3 text-gray-600 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </Link>
  );
}

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

function DashboardHeader({ timeOfDay }) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Good {timeOfDay}, Student! 👋
            </h1>
            <p className="text-gray-600">Here's your academic overview for today</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <p className="text-xs text-gray-600 mb-0.5">Current Semester</p>
              <p className="text-sm font-bold text-indigo-700">ODD 2025</p>
            </div>
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsOverview({ courses, upcomingExams, feePercentage }) {
  const avgProgress = Math.round(
    courses.reduce((acc, c) => acc + c.progress, 0) / courses.length
  );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        label="Active Courses"
        value={courses.length}
        subtitle="This semester"
        gradient="from-indigo-500 to-purple-600"
        bgColor="bg-indigo-50"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Avg Progress"
        value={`${avgProgress}%`}
        subtitle="Course completion"
        gradient="from-emerald-500 to-teal-600"
        bgColor="bg-emerald-50"
      />
      <StatCard
        icon={<Calendar className="w-6 h-6" />}
        label="Upcoming Exams"
        value={upcomingExams.length}
        subtitle="Next 30 days"
        gradient="from-amber-500 to-orange-600"
        bgColor="bg-amber-50"
      />
      <StatCard
        icon={<Award className="w-6 h-6" />}
        label="Fees Paid"
        value={`${Math.round(feePercentage)}%`}
        subtitle="Of total amount"
        gradient="from-violet-500 to-purple-600"
        bgColor="bg-violet-50"
      />
    </section>
  );
}

function CourseProgressSection({ courses }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Course Progress</h2>
            <p className="text-sm text-gray-500 mt-1">Track your learning journey</p>
          </div>
          <Link
            to="/academics"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {courses.map((course) => (
          <CourseProgressItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function PendingFeesSection({ pendingFees, totalFees, feePercentage }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <DollarSign className="w-6 h-6 text-amber-600" />
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
            Action Required
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">Pending Fees</h3>
        <p className="text-sm text-gray-600 mb-4">Complete your payment</p>
        
        <div className="mb-6">
          <p className="text-4xl font-bold text-gray-900 mb-2">
            ₹{pendingFees.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            of ₹{totalFees.toLocaleString()} total fees
          </p>
          
          <div className="relative h-2.5 bg-white/50 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 rounded-full"
              style={{ width: `${feePercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 font-medium">
            {Math.round(feePercentage)}% completed
          </p>
        </div>

        <Link
          to="/finance"
          className="block w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-center font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-xl group"
        >
          <span className="flex items-center justify-center gap-2">
            Pay Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function UpcomingExamsSection({ upcomingExams }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Upcoming Exams</h2>
            <p className="text-sm text-gray-500 mt-1">Stay prepared</p>
          </div>
          <Link
            to="/exams"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {upcomingExams.map((exam, idx) => {
          const daysUntil = getDaysUntil(exam.date);
          return <ExamCard key={idx} exam={exam} daysUntil={daysUntil} />;
        })}
      </div>
    </div>
  );
}

function TodayScheduleSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
        <p className="text-sm text-gray-500 mt-1">Your classes for today</p>
      </div>
      <div className="p-6 space-y-4">
        <ScheduleItem
          title="Operating Systems Lecture"
          time="10:00 AM - 11:30 AM"
          location="Room 204"
          color="indigo"
        />
        <ScheduleItem
          title="DBMS Lab Session"
          time="2:00 PM - 4:00 PM"
          location="Lab 3"
          color="emerald"
        />
        <ScheduleItem
          title="AI & ML Tutorial"
          time="4:30 PM - 5:30 PM"
          location="Room 105"
          color="violet"
        />
      </div>
    </div>
  );
}

function QuickAccessSection() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Quick Access</h2>
        <p className="text-sm text-gray-500 mt-1">Navigate to key sections</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickLink to="/academics" icon={<GraduationCap />} label="Academics" color="indigo" />
          <QuickLink to="/library" icon={<BookOpen />} label="Library" color="emerald" />
          <QuickLink to="/student-life" icon={<Users />} label="Student Life" color="violet" />
          <QuickLink to="/finance" icon={<DollarSign />} label="Finance" color="amber" />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

export default function Dashboard({ data = {} }) {
  const [timeOfDay] = useState(getTimeOfDay);

  // Data initialization
  const courses = data.courses ?? [
    { id: "os", name: "Operating Systems", code: "CS401", progress: 78, lastAccessed: "2 hours ago" },
    { id: "aiml", name: "AI & ML", code: "CS402", progress: 62, lastAccessed: "1 day ago" },
    { id: "dbms", name: "Database Management", code: "CS403", progress: 88, lastAccessed: "3 hours ago" },
  ];

  const upcomingExams = data.upcomingExams ?? [
    { subject: "Data Structures", date: "2025-10-25", time: "10:00 AM", duration: "3 hours", room: "Hall A" },
    { subject: "DBMS", date: "2025-10-28", time: "2:00 PM", duration: "2 hours", room: "Hall B" },
  ];

  const pendingFees = data.pendingFees ?? 35000;
  const totalFees = data.totalFees ?? 100000;
  const feePercentage = ((totalFees - pendingFees) / totalFees) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <DashboardHeader timeOfDay={timeOfDay} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <StatsOverview 
          courses={courses} 
          upcomingExams={upcomingExams} 
          feePercentage={feePercentage} 
        />

        {/* Course Progress & Pending Fees */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CourseProgressSection courses={courses} />
          <PendingFeesSection 
            pendingFees={pendingFees}
            totalFees={totalFees}
            feePercentage={feePercentage}
          />
        </div>

        {/* Upcoming Exams & Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingExamsSection upcomingExams={upcomingExams} />
          <TodayScheduleSection />
        </div>

        {/* Quick Access Links */}
        <QuickAccessSection />
      </div>
    </main>
  );
}