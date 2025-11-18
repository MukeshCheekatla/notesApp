import React from "react";
import { Trash2, Archive, ArchiveRestore, Pin } from "lucide-react";

const colorClasses = {
  yellow: "bg-yellow-100 border-yellow-300",
  blue: "bg-blue-100 border-blue-300",
  green: "bg-green-100 border-green-300",
  pink: "bg-pink-100 border-pink-300",
  purple: "bg-purple-100 border-purple-300",
  gray: "bg-gray-100 border-gray-300",
};

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleArchive,
}) {
  return (
    <div
      onClick={() => onEdit(note)}
      className={`${
        colorClasses[note.color]
      } border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-200 relative group`}
    >
      {note.pinned && (
        <div className="absolute top-2 right-2">
          <Pin size={16} className="text-gray-600 fill-current" />
        </div>
      )}

      <h3 className="font-semibold text-gray-800 mb-2 pr-6 wrap-break-word">
        {note.title || "Untitled"}
      </h3>

      <p className="text-gray-700 text-sm whitespace-pre-wrap wrap-break-word line-clamp-6">
        {note.content}
      </p>

      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}
          className="p-1.5 hover:bg-black/10 rounded transition"
          title={note.pinned ? "Unpin note" : "Pin note"}
        >
          <Pin size={16} className={note.pinned ? "fill-current" : ""} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleArchive(note.id);
          }}
          className="p-1.5 hover:bg-black/10 rounded transition"
          title={note.archived ? "Unarchive note" : "Archive note"}
        >
          {note.archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="p-1.5 hover:bg-red-500/20 rounded transition text-red-600"
          title="Delete note"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="text-xs text-gray-500 mt-3">
        {note.date_modified
          ? new Date(note.date_modified).toLocaleDateString()
          : ""}
      </div>
    </div>
  );
}
