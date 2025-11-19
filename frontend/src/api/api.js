const API_URL = import.meta.env.VITE_API_URL;


// Helper to get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const notesAPI = {
  // Get notes (active or archived)
  getNotes: async (archived = false) => {
    const res = await fetch(`${API_URL}/api/notes?archived=${archived}`, {
      headers: getAuthHeader(),
    });

    if (!res.ok) throw new Error('Failed to load notes');
    return res.json();
  },

  // Create new note
  createNote: async (noteData) => {
    const res = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        title: noteData.title || 'Untitled Note',
        content: noteData.content,
        color: noteData.color || 'yellow', // NOW SAVED CORRECTLY
      }),
    });

    if (!res.ok) throw new Error('Failed to create note');
    return res.json();
  },

  // Update existing note
  updateNote: async (id, noteData) => {
    const res = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        title: noteData.title || 'Untitled Note',
        content: noteData.content,
        color: noteData.color || 'yellow', // NOW SAVED CORRECTLY
      }),
    });

    if (!res.ok) throw new Error('Failed to update note');
    return res.json();
  },

  // Delete note
  deleteNote: async (id) => {
    const res = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });

    if (!res.ok) throw new Error('Failed to delete note');
    return res.json();
  },

  // Toggle pin
  togglePin: async (id) => {
    const res = await fetch(`${API_URL}/api/notes/${id}/pin`, {
      method: 'PATCH',
      headers: getAuthHeader(),
    });

    if (!res.ok) throw new Error('Failed to pin note');
    return res.json();
  },

  // Toggle archive
  toggleArchive: async (id) => {
    const res = await fetch(`${API_URL}/api/notes/${id}/archive`, {
      method: 'PATCH',
      headers: getAuthHeader(),
    });

    if (!res.ok) throw new Error('Failed to archive note');
    return res.json();
  },
};