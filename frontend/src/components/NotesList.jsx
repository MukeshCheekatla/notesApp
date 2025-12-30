import React, { useState, useEffect } from 'react';
import { Plus, Archive, Home, Inbox, Pin, Search } from 'lucide-react';
import { notesAPI } from '../api/api';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

export default function NotesList({ searchQuery }) {
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
      setLoading(true);
      const data = await notesAPI.getNotes(showArchived);
      setNotes(data);
    } catch (err) {
      console.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const openNewNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const saveNote = async (noteData) => {
    try {
      if (editingNote) {
        await notesAPI.updateNote(editingNote.id, noteData);
      } else {
        await notesAPI.createNote(noteData);
      }
      fetchNotes();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save note');
    }
  };

  // These functions are passed to NoteCard — it will handle delete confirmation itself
  const deleteNote = async (id) => {
    await notesAPI.deleteNote(id);
    fetchNotes();
  };

  const togglePin = async (id) => {
    await notesAPI.togglePin(id);
    fetchNotes();
  };

  const toggleArchive = async (id) => {
    await notesAPI.toggleArchive(id);
    fetchNotes();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-500 text-lg">Loading your notes...</p>
      </div>
    );
  }

  const filteredNotes = notes.filter(n => 
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const otherNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Tabs + New Note Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        
        <div className="flex gap-4">
          <button
            onClick={() => setShowArchived(false)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition 
              ${!showArchived 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Home size={20} />
            Notes
          </button>

          <button
            onClick={() => setShowArchived(true)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition 
              ${showArchived 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Archive size={20} />
            Archived
          </button>
        </div>

        <button
          onClick={openNewNote}
          className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          <Plus size={24} />
          New Note
        </button>
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-24">
          <div className="inline-block p-10 bg-gray-50 rounded-3xl">
            {searchQuery ? (
              <>
                <Search size={70} className="mx-auto mb-6 text-gray-400" />
                <p className="text-xl text-gray-600">No notes match your search</p>
              </>
            ) : showArchived ? (
              <>
                <Archive size={70} className="mx-auto mb-6 text-gray-400" />
                <p className="text-xl text-gray-600">No archived notes</p>
              </>
            ) : (
              <>
                <Inbox size={70} className="mx-auto mb-6 text-gray-400" />
                <p className="text-xl text-gray-600 mb-4">No notes yet</p>
                <button
                  onClick={openNewNote}
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Create your first note
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length > 0 && (
        <div className="space-y-16">
          {/* Pinned Section */}
          {pinnedNotes.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                <Pin size={20} className="fill-blue-600 text-blue-600" />
                Pinned Notes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pinnedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={openEditNote}
                    onDelete={deleteNote}
                    onTogglePin={togglePin}
                    onToggleArchive={toggleArchive}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Other Notes */}
          {otherNotes.length > 0 && (
            <section>
              {pinnedNotes.length > 0 && (
                <h2 className="text-lg font-bold text-gray-700 mb-6">
                  Other Notes
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {otherNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={openEditNote}
                    onDelete={deleteNote}
                    onTogglePin={togglePin}
                    onToggleArchive={toggleArchive}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Modal for Create/Edit */}
      <NoteModal
        note={editingNote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveNote}
      />
    </div>
  );
}