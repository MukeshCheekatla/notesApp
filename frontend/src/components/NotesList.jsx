import React, { useState, useEffect } from 'react';
import { Plus, Archive, Home } from 'lucide-react';
import { notesAPI } from '../api/api';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [showArchived]);

  const fetchNotes = async () => {
    try {
      const data = await notesAPI.getNotes(showArchived);
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await notesAPI.updateNote(editingNote.id, noteData);
      } else {
        await notesAPI.createNote(noteData);
      }
      fetchNotes();
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await notesAPI.deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      await notesAPI.togglePin(id);
      fetchNotes();
    } catch (err) {
      console.error('Failed to toggle pin:', err);
    }
  };

  const handleToggleArchive = async (id) => {
    try {
      await notesAPI.toggleArchive(id);
      fetchNotes();
    } catch (err) {
      console.error('Failed to toggle archive:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading notes...</div>
      </div>
    );
  }

  const pinnedNotes = notes.filter(note => note.pinned);
  const unpinnedNotes = notes.filter(note => !note.pinned);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setShowArchived(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              !showArchived
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Home size={18} />
            Notes
          </button>
          <button
            onClick={() => setShowArchived(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              showArchived
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Archive size={18} />
            Archived
          </button>
        </div>
        
        <button
          onClick={handleCreateNote}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          <Plus size={20} />
          New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            {showArchived ? 'No archived notes' : 'No notes yet'}
          </p>
          {!showArchived && (
            <button
              onClick={handleCreateNote}
              className="text-blue-600 hover:underline"
            >
              Create your first note
            </button>
          )}
        </div>
      ) : (
        <div>
          {pinnedNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
                Pinned
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                    onToggleArchive={handleToggleArchive}
                  />
                ))}
              </div>
            </div>
          )}

          {unpinnedNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && (
                <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
                  Others
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {unpinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                    onToggleArchive={handleToggleArchive}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <NoteModal
        note={editingNote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
}