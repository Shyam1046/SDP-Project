// src/pages/library/EBooks.jsx
import React from "react";

const ebooks = [
  { id: 1, title: "Learning React", author: "Alex Banks", size: "4.2 MB", url: "#" },
  { id: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford", size: "1.1 MB", url: "#" },
  { id: 3, title: "Deep Learning", author: "Ian Goodfellow", size: "12.5 MB", url: "#" }
];

export default function EBooks() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">E-Books</h2>

      <div className="bg-white shadow rounded-lg p-4 space-y-3">
        {ebooks.map((e) => (
          <div key={e.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-600">{e.author} · {e.size}</p>
            </div>

            <div className="flex gap-2">
              <a href={e.url} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Preview</a>
              <a href={e.url} download className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">Download</a>
            </div>
          </div>
        ))}

        {ebooks.length === 0 && <p className="text-gray-500">No e-books available.</p>}
      </div>
    </div>
  );
}
