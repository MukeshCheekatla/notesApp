import React, { useState } from "react";
import { Trash2, Archive, ArchiveRestore, Pin, X } from "lucide-react";

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleArchive,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(note.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => setShowDeleteConfirm(false);

  return (
    <>
      {/* Simple Yellow Note Card */}
      <div
        onClick={() => onEdit(note)}
        className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 cursor-pointer 
                   hover:shadow-lg transition-shadow relative min-h-48"
      >
        {/* Pinned */}
        {note.pinned && (
          <div className="absolute top-4 right-4">
            <Pin size={22} className="fill-blue-600 text-blue-600" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 pr-8">
          {note.title || "Untitled Note"}
        </h3>

        {/* Content */}
        <p className="text-gray-600 text-sm whitespace-pre-wrap line-clamp-5">
          {note.content || "No content"}
        </p>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onTogglePin(note.id); }}
            className="p-2 bg-white rounded-full shadow hover:shadow-md"
            title={note.pinned ? "Unpin" : "Pin"}
          >
            <Pin size={18} className={note.pinned ? "fill-blue-600 text-blue-600" : "text-gray-600"} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onToggleArchive(note.id); }}
            className="p-2 bg-white rounded-full shadow hover:shadow-md"
          >
            {note.archived ? <ArchiveRestore size={18} /> : <Archive size={18} />}
          </button>

          <button
            onClick={handleDeleteClick}
            className="p-2 bg-white rounded-full shadow hover:shadow-md"
            title="Delete"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>

        {/* Date */}
        <div className="absolute bottom-4 left-6 text-xs text-gray-500">
          {note.date_modified
            ? new Date(note.date_modified).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "No date"}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Delete Note?</h3>
              <button onClick={cancelDelete} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-8">
              Are you sure you want to delete "<span className="font-medium">{note.title || "this note"}</span>"?
              This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelDelete} className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}