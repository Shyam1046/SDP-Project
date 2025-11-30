// src/pages/library/BorrowedBooks.jsx
import React from "react";

const borrowed = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen", due: "2025-02-10" },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", due: "2025-02-18" },
  { id: 3, title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", due: "2025-03-01" }
];

export default function BorrowedBooks() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowed.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.title}</td>
                <td className="p-3">{b.author}</td>
                <td className="p-3">{new Date(b.due).toLocaleDateString()}</td>
                <td className="p-3">
                  <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700">
                    Renew
                  </button>
                </td>
              </tr>
            ))}
            {borrowed.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No borrowed books</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
