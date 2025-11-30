// src/pages/finance/Overview.jsx
import React from "react";
import { CheckCircle, AlertCircle, DollarSign, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function Overview({ data = null }) {
  const totalFees = data?.totalFees ?? 100000;
  const paid = data?.paid ?? 60000;
  const pending = totalFees - paid;
  const paymentPercentage = (paid / totalFees) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Paid</span>
          </div>
          <p className="text-2xl font-bold">₹{(paid).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round(paymentPercentage)}% of total</p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <span className="text-sm font-medium text-amber-600">Pending</span>
          </div>
          <p className="text-2xl font-bold">₹{(pending).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round(100 - paymentPercentage)}% remaining</p>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Total Fees</span>
          </div>
          <p className="text-2xl font-bold">₹{(totalFees).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">This semester</p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Scholarship</span>
          </div>
          <p className="text-2xl font-bold">25%</p>
          <p className="text-xs text-gray-500 mt-1">Merit discount</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Outstanding</p>
            <p className="text-xl font-bold">₹{pending.toLocaleString()}</p>
          </div>
          <Link to="/payment" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Pay Now</Link>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${paymentPercentage}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-right">{Math.round(paymentPercentage)}% completed</p>
      </div>
    </div>
  );
}
