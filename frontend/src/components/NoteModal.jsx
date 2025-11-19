import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function NoteModal({ note, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [note, isOpen]);

  const handleSave = () => {
    if (!content.trim()) return;

    onSave({
      title: title.trim() || "Untitled Note",
      content: content.trim(),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {note ? "Edit Note" : "New Note"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={26} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title..."
            className="w-full text-3xl font-bold text-gray-800 bg-transparent outline-none placeholder-gray-400"
            autoFocus
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note..."
            className="w-full min-h-64 text-lg text-gray-700 bg-transparent resize-none outline-none placeholder-gray-400 leading-relaxed"
            rows={10}
          />
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-200 rounded-xl">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {note ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}