// StudentLife.jsx
import React, { useState } from "react";
import { Users, Calendar, Briefcase, Star, TrendingUp, Award, MapPin, Clock } from "lucide-react";

export default function StudentLife({ data = null }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);

  const clubs = data?.clubs ?? [
    { id: 1, name: "Coding Club", members: 150, category: "Technical", role: "Member" },
    { id: 2, name: "Robotics Club", members: 85, category: "Technical", role: "Member" },
    { id: 3, name: "Drama Club", members: 60, category: "Cultural", role: "Core Team" },
  ];

  const events = data?.events ?? [
    { 
      id: 1,
      name: "Hackathon 2025", 
      date: "2025-10-15", 
      time: "9:00 AM",
      type: "Competition",
      venue: "Tech Hub",
      participants: 120,
      prizes: "₹50,000"
    },
    { 
      id: 2,
      name: "Drama Night", 
      date: "2025-10-18", 
      time: "6:00 PM",
      type: "Cultural",
      venue: "Auditorium",
      participants: 200,
      prizes: "Certificates"
    },
    { 
      id: 3,
      name: "Sports Fest", 
      date: "2025-10-20", 
      time: "8:00 AM",
      type: "Sports",
      venue: "Sports Complex",
      participants: 300,
      prizes: "₹30,000"
    },
  ];

  const workshops = data?.workshops ?? [
    { 
      id: 1,
      title: "AI & ML Workshop", 
      date: "2025-10-12", 
      time: "2:00 PM",
      seats: 40,
      registered: 28,
      instructor: "Dr. Sarah Smith",
      duration: "3 hours"
    },
    { 
      id: 2,
      title: "Web Development Bootcamp", 
      date: "2025-10-14", 
      time: "10:00 AM",
      seats: 50,
      registered: 45,
      instructor: "Prof. John Doe",
      duration: "4 hours"
    },
    { 
      id: 3,
      title: "Public Speaking Masterclass", 
      date: "2025-10-16", 
      time: "3:00 PM",
      seats: 30,
      registered: 15,
      instructor: "Ms. Emily Brown",
      duration: "2 hours"
    },
  ];

  const getDaysUntil = (dateString) => {
    const days = Math.ceil((new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      Competition: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100" },
      Cultural: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100" },
      Sports: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100" },
      Technical: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100" },
    };
    return colors[type] || colors.Technical;
  };

  const handleWorkshopRegister = (workshopId) => {
    if (!registeredWorkshops.includes(workshopId)) {
      setRegisteredWorkshops([...registeredWorkshops, workshopId]);
    }
  };

  const stats = {
    totalClubs: clubs.length,
    upcomingEvents: events.length,
    workshopsAvailable: workshops.length,
    achievements: 5,
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Life</h1>
        <p className="text-gray-600 text-lg">Explore clubs, events, and extracurricular opportunities</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Clubs</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalClubs}</p>
          <p className="text-sm text-gray-600 mt-1">Active memberships</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Events</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</p>
          <p className="text-sm text-gray-600 mt-1">Coming up soon</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Briefcase className="w-8 h-8 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Workshops</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.workshopsAvailable}</p>
          <p className="text-sm text-gray-600 mt-1">Available to join</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-green-600" />
            <span className="text-sm font-medium text-green-600">Achievements</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.achievements}</p>
          <p className="text-sm text-gray-600 mt-1">Certificates earned</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Your Clubs */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-5">Your Clubs</h3>
          <div className="space-y-4">
            {clubs.map((c) => {
              const colors = getEventTypeColor(c.category);
              return (
                <div
                  key={c.id}
                  className={`p-4 border-2 rounded-xl ${colors.border} ${colors.bg} hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{c.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        <Users className="w-3 h-3 inline mr-1" />
                        {c.members} members
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.badge} ${colors.text}`}>
                      {c.role}
                    </span>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${colors.badge} ${colors.text}`}>
                    {c.category}
                  </span>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-5 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
            Explore More Clubs
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-5">Upcoming Events</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {events.map((e) => {
              const daysUntil = getDaysUntil(e.date);
              const colors = getEventTypeColor(e.type);
              
              return (
                <div
                  key={e.id}
                  className={`p-4 border-2 rounded-xl ${colors.border} ${colors.bg} hover:shadow-md transition-all cursor-pointer`}
                  onClick={() => setSelectedEvent(e)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{e.name}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(e.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{e.time}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        daysUntil <= 3 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil}d`}
                    </span>
                  </div>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors.badge} ${colors.text}`}>
                    {e.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workshops */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-5">Workshops</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {workshops.map((w) => {
              const isRegistered = registeredWorkshops.includes(w.id);
              const seatsLeft = w.seats - w.registered;
              const fillPercentage = (w.registered / w.seats) * 100;
              
              return (
                <div
                  key={w.id}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                >
                  <div className="mb-3">
                    <p className="font-bold text-gray-900">{w.title}</p>
                    <p className="text-sm text-gray-600 mt-1">By {w.instructor}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(w.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {w.duration}
                      </span>
                    </div>
                  </div>

                                      <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Seats filled</span>
                      <span className={seatsLeft <= 5 ? "text-red-600 font-semibold" : ""}>
                        {seatsLeft} left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          fillPercentage >= 90 ? "bg-red-500" : fillPercentage >= 70 ? "bg-orange-500" : "bg-green-500"
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleWorkshopRegister(w.id)}
                    disabled={isRegistered || seatsLeft === 0}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isRegistered
                        ? "bg-green-100 text-green-700 border-2 border-green-300 cursor-default"
                        : seatsLeft === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {isRegistered ? "✓ Registered" : seatsLeft === 0 ? "Seats Full" : "Register Now"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg rounded-2xl p-6 border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Hackathon Winner 2024</p>
                <p className="text-sm text-gray-500">First Place - Coding Challenge</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Drama Excellence Award</p>
                <p className="text-sm text-gray-500">Best Actor - Annual Fest</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Leadership Certificate</p>
                <p className="text-sm text-gray-500">Club President - Robotics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg rounded-2xl p-6 border border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Discover More</h3>
          <p className="text-gray-700 mb-4">
            Explore additional opportunities to enhance your campus experience. Join new clubs, 
            create events, or sync activities to your personal calendar.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-white border-2 border-orange-300 text-orange-700 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-all">
              Browse Clubs
            </button>
            <button className="p-3 bg-white border-2 border-orange-300 text-orange-700 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-all">
              Create Event
            </button>
            <button className="p-3 bg-white border-2 border-orange-300 text-orange-700 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-all">
              View Calendar
            </button>
            <button className="p-3 bg-white border-2 border-orange-300 text-orange-700 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-all">
              Share Events
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h3>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                getEventTypeColor(selectedEvent.type).badge
              } ${getEventTypeColor(selectedEvent.type).text}`}>
                {selectedEvent.type}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Expected Participants</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.participants} students</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Prizes</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.prizes}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
              >
                Register for Event
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}